const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const Mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

// Bring in Models & Helpers
const Control = require('../../models/control');
const Framework = require('../../models/framework');
const Domain = require('../../models/domain');
const SubControl = require('../../models/subControl');
const Wishlist = require('../../models/wishlist');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const checkAuth = require('../../helpers/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// fetch control slug api
router.get('/item/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const controlDoc = await Control.findOne({ slug, isApplicable: true }).populate(
      {
        path: 'domain',
        select: 'name isApplicable slug'
      }
    );

    if (!controlDoc || (controlDoc && controlDoc?.domain?.isApplicable === false)) {
      return res.status(404).json({
        message: 'No control found.'
      });
    }

    res.status(200).json({
      Control: controlDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch  control name search api
router.get('/list/search/:name', async (req, res) => {
  try {
    const name = req.params.name;

    const controlDoc = await Control.find(
      { name: { $regex: new RegExp(name), $options: 'is' }, isApplicable: true },
      { name: 1, slug: 1, imageUrl: 1, price: 1, _id: 0 }
    );

    if (controlDoc.length < 0) {
      return res.status(404).json({
        message: 'No control found.'
      });
    }

    res.status(200).json({
      controls: controlDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch store products by advancedFilters api
router.post('/list', async (req, res) => {
  try {
    let {
      sortOrder,
      rating,
      max,
      min,
      domain,
      pageNumber: page = 1
    } = req.body;

    const pageSize = 8;
    const domainFilter = domain ? { domain } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating
      ? { rating: { $gte: rating } }
      : { rating: { $gte: rating } };

    const basicQuery = [
      {
        $lookup: {
          from: 'domains',
          localField: 'domain',
          foreignField: '_id',
          as: 'domains'
        }
      },
      {
        $unwind: {
          path: '$domains',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          'domain.name': '$domains.name',
          'domain._id': '$domains._id',
          'domain.isApplicable': '$domains.isApplicable'
        }
      },
      {
        $match: {
          'domain.isApplicable': true
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'control',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          totalRatings: { $sum: '$reviews.rating' },
          totalReviews: { $size: '$reviews' }
        }
      },
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $eq: ['$totalReviews', 0] },
              0,
              { $divide: ['$totalRatings', '$totalReviews'] }
            ]
          }
        }
      },
      {
        $match: {
          isApplicable: true,
          price: priceFilter.price,
          averageRating: ratingFilter.rating
        }
      },
      {
        $project: {
          domains: 0,
          reviews: 0
        }
      }
    ];

    const userDoc = await checkAuth(req);
    const domainDoc = await Domain.findOne(
      { slug: domainFilter.domain, isApplicable: true },
      'controls -_id'
    );

    if (domainDoc && domainFilter !== domain) {
      basicQuery.push({
        $match: {
          isApplicable: true,
          _id: {
            $in: Array.from(domainDoc.controls)
          }
        }
      });
    }

    let controls = null;
    let controlsCount = 0;

    if (userDoc) {
      controlsCount = await Control.aggregate(
        [
          {
            $lookup: {
              from: 'wishlists',
              let: { controls: '$_id' },
              pipeline: [
                {
                  $match: {
                    $and: [
                      { $expr: { $eq: ['$$control', '$control'] } },
                      { user: new Mongoose.Types.ObjectId(userDoc.id) }
                    ]
                  }
                }
              ],
              as: 'isLiked'
            }
          },
          {
            $addFields: {
              isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
            }
          }
        ].concat(basicQuery)
      );
      const paginateQuery = [
        { $sort: sortOrder },
        { $skip: pageSize * (controlsCount.length > 8 ? page - 1 : 0) },
        { $limit: pageSize }
      ];
      controls = await Control.aggregate(
        [
          {
            $lookup: {
              from: 'wishlists',
              let: { control: '$_id' },
              pipeline: [
                {
                  $match: {
                    $and: [
                      { $expr: { $eq: ['$$control', '$control'] } },
                      { user: new Mongoose.Types.ObjectId(userDoc.id) }
                    ]
                  }
                }
              ],
              as: 'isLiked'
            }
          },
          {
            $addFields: {
              isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
            }
          }
        ]
          .concat(basicQuery)
          .concat(paginateQuery)
      );
    } else {
      controlsCount = await Control.aggregate(basicQuery);
      const paginateQuery = [
        { $sort: sortOrder },
        { $skip: pageSize * (controlsCount.length > 8 ? page - 1 : 0) },
        { $limit: pageSize }
      ];
      controls = await Control.aggregate(basicQuery.concat(paginateQuery));
    }

    res.status(200).json({
      controls,
      page,
      pages:
        controlsCount.length > 0
          ? Math.ceil(controlsCount.length / pageSize)
          : 0,
      totalControls: controlsCount.length
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch store products by framework api
router.get('/list/domain/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const domain = await Framework.findOne({ slug, isApplicable: true });

    if (!domain) {
      return res.status(404).json({
        message: `Cannot find domain with the slug: ${slug}.`
      });
    }

    const userDoc = await checkAuth(req);

    if (userDoc) {
      const controls = await Control.aggregate([
        {
          $match: {
            isApplicable: true,
            domain: domain._id
          }
        },
        {
          $lookup: {
            from: 'wishlists',
            let: { control: '$_id' },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $eq: ['$$control', '$control'] } },
                    { user: new Mongoose.Types.ObjectId(userDoc.id) }
                  ]
                }
              }
            ],
            as: 'isLiked'
          }
        },
        {
          $lookup: {
            from: 'domains',
            localField: 'domain',
            foreignField: '_id',
            as: 'domains'
          }
        },
        {
          $addFields: {
            isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
          }
        },
        {
          $unwind: '$domains'
        },
        {
          $addFields: {
            'domain.name': '$domains.name',
            'domain._id': '$domains._id',
            'domain.isApplicable': '$domains.isApplicable'
          }
        },
        { $project: { domains: 0 } }
      ]);

      res.status(200).json({
        controls: controls.reverse().slice(0, 8),
        page: 1,
        pages: controls.length > 0 ? Math.ceil(controls.length / 8) : 0,
        totalControls: controls.length
      });
    } else {
      const controls = await Control.find({
        domain: domain._id,
        isApplicable: true
      }).populate('domain', 'name');

      res.status(200).json({
        controls: controls.reverse().slice(0, 8),
        page: 1,
        pages: controls.length > 0 ? Math.ceil(controls.length / 8) : 0,
        totalControls: controls.length
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/list/select', auth, async (req, res) => {
  try {
    const controls = await Control.find({}, 'name');

    res.status(200).json({
      controls
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// add product api
router.post(
  '/add',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Regulator),
  async (req, res) => {
    try {

    const subControl = new SubControl({...req.body}); 
    const subControlDoc = await subControl.save();
    const control = new Control({...req.body, subControl: subControlDoc._id}); 
   // const controlDoc = await control.save();
    const savedControl = await control.save();

   // const control = new Control(req.body.control); 
   // const controlDoc = await control.save();
      // const mControlNo = req.body.mControlNo;
      // const sControlNo = req.body.sControlNo;
      // const name = req.body.name;
      //  const description = req.body.description;
      //  const comments = req.body.comments;
      // const isApplicable = req.body.isApplicable;
      // const domain = req.body.domain;

      // if (!mControlNo) {
      //   return res.status(400).json({ error: 'You must enter main control.' });
      // }

      // if (!sControlNo) {
      //   return res.status(400).json({ error: 'You must enter sub control.' });
      // }

      // if (!description || !name) {
      //   return res
      //     .status(400)
      //     .json({ error: 'You must enter description & name.' });
      // }

      // if (!quantity) {
      //   return res.status(400).json({ error: 'You must enter a quantity.' });
      // }

      // if (!price) {
      //   return res.status(400).json({ error: 'You must enter a price.' });
      // }

      // const foundControl = await Control.findOne({ mControlNo });

      // if (foundControl) {
      //   return res.status(400).json({ error: 'This control is already in use.' });
      // }

      // let imageUrl = '';
      // let imageKey = '';

      // if (image) {
      //   const s3bucket = new AWS.S3({
      //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      //     region: process.env.AWS_REGION
      //   });

      //   const params = {
      //     // Bucket: process.env.AWS_BUCKET_NAME,
      //     Key: image.originalname,
      //     Body: image.buffer,
      //     ContentType: image.mimetype,
      //     ACL: 'public-read'
      //   };

      //   const s3Upload = await s3bucket.upload(params).promise();

      //   imageUrl = s3Upload.Location;
      //   imageKey = s3Upload.key;
      // }

      //  const control = new Control({
      //    description,
      //    comments
      //   //  name,
      //   //  description,
      //   //  isApplicable,
      //   //  domain
      //  });
      //console.log(control);
      res.status(200).json({
        success: true,
        message: `Control has been added successfully!`,
        control: savedControl
      });
    } catch (error) {
      return res.status(400).json({
        error
        // error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch products api
router.get(
  '/',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Regulator),
  async (req, res) => {
    try {
      let controls = [];

      if (req.user.client || req.user.regulator) {
        if(req.user.client){
          const domains = await Domain.find({
            client: req.user.client
          }).populate('client', '_id');
          const domainId = domains[0]['_id'];

          controls = await Control.find({})
            .populate({
              path: 'domain',
              populate: {
                path: 'client',
                model: 'Client'
              }
            })
            .where('domain', domainId);
        }
        else{
          const domains = await Framework.find({
            regulator: req.user.regulator
          }).populate('regulator', '_id');
          const domainId = domains[0]['_id'];

          controls = await Control.find({})
            .populate({
              path: 'domain',
              populate: {
                path: 'client',
                model: 'Client'
              }
            })
            .where('domain', domainId);
        }

      } else {
        controls = await Control.find({}).populate({
          path: 'domain',
          populate: {
            path: 'regulator',
            model: 'Regulator'
          }
        });
      }

      res.status(200).json({
        controls
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch product api
router.get(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Regulator,role.ROLES.Client),
  async (req, res) => {
    try {
      const controlId = req.params.id;

      let controlDoc = null;

      if (req.user.client) {
        const domains = await Domain.find({
          client: req.user.client
        }).populate('client', '_id');

        const domainId = domains[0]['_id'];

        controlDoc = await Control.findOne({ _id: controlId })
          .populate({
            path: 'domain',
            select: 'name'
          })
          .where('domain', domainId);
      } else {
        controlDoc = await Control.findOne({ _id: controlId }).populate({
          path: 'domain',
          select: 'name'
        });
      }

      if (!controlDoc) {
        return res.status(404).json({
          message: 'No product found.'
        });
      }

      res.status(200).json({
        control: controlDoc
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id',
  auth,
  role.checkRole(role.ROLES.Admin,  role.ROLES.Regulator ,role.ROLES.Client),
  async (req, res) => {
    try {
      const controlId = req.params.id;
      const update = req.body.control;
      const query = { _id: controlId };

      await Control.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Regulator, role.ROLES.Client),
  async (req, res) => {
    try {
      const controlId = req.params.id;
      const update = req.body.control;
      const query = { _id: controlId };

      await Control.findOneAndUpdate(query, update, {
        new: true
      });

      res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.checkRole(role.ROLES.Admin, role.ROLES.Client,role.ROLES.Regulator),
  async (req, res) => {
    try {
      const control = await Control.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
        control
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;
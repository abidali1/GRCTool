const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Cart = require('../../models/cart');
const Control = require('../../models/control');
const auth = require('../../middleware/auth');
const store = require('../../helpers/store');

router.post('/add', auth, async (req, res) => {
  try {
    const user = req.user._id;
    const items = req.body.controls;

    const controls = store.caculateItemsSalesTax(items);

    const cart = new Cart({
      user,
      controls
    });

    const cartDoc = await cart.save();

    decreaseQuantity(controls);

    res.status(200).json({
      success: true,
      cartId: cartDoc.id
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:cartId', auth, async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.params.cartId });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/add/:cartId', auth, async (req, res) => {
  try {
    const control = req.body.control;
    const query = { _id: req.params.cartId };

    await Cart.updateOne(query, { $push: { controls: control } }).exec();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:cartId/:productId', auth, async (req, res) => {
  try {
    const control = { control: req.params.productId };
    const query = { _id: req.params.cartId };

    await Cart.updateOne(query, { $pull: { controls: control } }).exec();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

const decreaseQuantity = controls => {
  let bulkOptions = controls.map(item => {
    return {
      updateOne: {
        filter: { _id: item.controls },
        update: { $inc: { quantity: -item.quantity } }
      }
    };
  });

  Control.bulkWrite(bulkOptions);
};

module.exports = router;

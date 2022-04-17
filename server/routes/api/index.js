const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const addressRoutes = require('./address');
const newsletterRoutes = require('./newsletter');
const controlRoutes = require('./control');
const domainRoutes = require('./domain');
const frameworkRoutes = require('./framework');
const contactRoutes = require('./contact');
const clientRoutes = require('./client');
const implementerRoutes = require('./implementer');
const internalauditorRoutes = require('./internalauditor');
const externalauditorRoutes = require('./externalauditor');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');
const wishlistRoutes = require('./wishlist');
const regulatorRoutes = require('./regulator')
const implementedframeworkRoutes=require('./implementedframework')
// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// address routes
router.use('/address', addressRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/control', controlRoutes);

// category routes
router.use('/domain', domainRoutes);

// brand routes
router.use('/framework', frameworkRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/client', clientRoutes);

// regulator routes
router.use('/regulator', regulatorRoutes);

// implementer routes
router.use('/implementer', implementerRoutes);

// externalauditor routes
router.use('/externalauditor', externalauditorRoutes);

// internalauditor routes
router.use('/internalauditor', internalauditorRoutes);

// implementedframework routes
router.use('/implementedframework',implementedframeworkRoutes)
  

module.exports = router;
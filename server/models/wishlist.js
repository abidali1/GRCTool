const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Wishlist Schema
const WishlistSchema = new Schema({
  control: {
    type: Schema.Types.ObjectId,
    ref: 'Control',
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date,
    default: Date.now
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Wishlist', WishlistSchema);

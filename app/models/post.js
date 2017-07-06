var mongoose = require('mongoose');

var postSchema = mongoose.Schema({

  title: String,
  overview: String,
  body: String,
  img0: String,
  author: String,
  category: String,
  slug: String,
  published: {
    type: Date,
    default: Date()
  }

});

module.exports = mongoose.model('post', postSchema);

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({

  title: String,

  // langiuages

  title_ru: String,
  title_hi: String,
  title_es: String,

  overview: String,
  body: String,

  // languages

  body_ru: String,
  body_hi: String,
  body_es: String,

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

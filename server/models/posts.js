var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  comments: { type: Array }
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;

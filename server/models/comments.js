var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  sub_comments: { type: Array }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

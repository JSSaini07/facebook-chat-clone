var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/posts.js')
var Comment = require('../models/comments.js')

router.get('/fetch_all_posts',function(req,res){
  Post.find({}, function(error,docs){
    if(!error){
      var posts = docs.map(d => {return {'id': d.id, 'created_at':d.created_at, 'username':d.username, 'content':d.content, 'comments':d.comments}});
      res.json({'status':true, 'data': posts});
    }else{
        res.json({'status':false, 'data':[]});
    }
  }).sort({'created_at': -1});
});

router.post('/create_post',function(req,res){
  var content = req.body.content;
  var username = req.body.username;
  var new_post = Post({
    username: username,
    content: content,
    comments: []
  });
  new_post.save(function(error){
    if(!error){
      for(var key in active_users){
        if(key!=req.session.identity){
          active_users[key].send(JSON.stringify({'createPostViaSocket':{data:new_post}}));
        }
      }
      res.json({'status':true, 'data': new_post});
    }else{
        res.json({'status':false, 'msg':error})
    }
  });
});

router.post('/fetch_all_comments',function(req,res){
  var post_id = req.body.post_id;
  Post.findOne({_id:post_id}, function(error,doc){
    if(!error){
      var comment_ids = doc.comments;
      Comment.find({ _id: { "$in" : comment_ids} }, function(err, comment_docs){
        res.json({'status':true, 'data':comment_docs, 'post_id': post_id});
      }).sort({'created_at': -1});;
    }else{
        res.json({'status':false, 'data':[]});
    }
  });
});

router.post('/save_comment',function(req,res){
  var content = req.body.content;
  var username = req.body.username;
  var post_id = req.body.post_id;
  var new_comment = Comment({
    username: username,
    content: content,
    sub_comments: []
  });
  new_comment.save(function(error){
    if(!error){
      Post.findOne({_id: post_id}, function(err, post){
        if(!err){
          post.comments.push(new_comment.id);
          post.save();
          for(var key in active_users){
            if(key!=req.session.identity){
              active_users[key].send(JSON.stringify({'saveCommentViaSocket':{data:new_comment, post_id: post_id}}));
            }
          }
          res.json({'status':true, 'data': new_comment, 'post_id': post_id});
        }else{
          res.json({'status':false, 'data':[]});
        }
      })
    }else{
      res.json({'status':false, 'data':[]})
    }
  });
});

router.post('/save_sub_comment',function(req,res){
  var content = req.body.content;
  var username = req.body.username;
  var post_id = req.body.post_id;
  var comment_id = req.body.comment_id;
  Comment.findOne({_id:comment_id},function(error,comment_doc){
    if(!error){
      comment_doc.sub_comments.push({
        'username': username,
        'content': content,
        'created_at': new Date()
      });
      comment_doc.sub_comments.reverse();
      comment_doc.save();
      for(var key in active_users){
        if(key!=req.session.identity){
          active_users[key].send(JSON.stringify({'saveSubCommentViaSocket':{data:comment_doc, post_id: post_id}}));
        }
      }
      res.json({'status':true, 'data':comment_doc, 'post_id': post_id})
    }else{
      res.json({'status':false, 'data':[]});
    }
  });
});

module.exports = router;

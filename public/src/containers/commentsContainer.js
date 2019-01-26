import React from 'react';
import {connect} from 'react-redux';
import CommentItem from './commentItem.js';
import saveComment from '../actions/saveComment.js';
import fetchAllComments from '../actions/fetchAllComments.js';

class CommentsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {comment: null};
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleKeyPress(){
    if(event.keyCode==13){
      if(this.state.username && this.state.comment){
        this.props.saveComment(this.props.postId, this.state.username, this.state.comment);
      }
      else{
        return;
      }
    }
  }
  render(){
    let commentView = <span></span>
    if(this.props.comments[this.props.postId]){
      commentView = (
        <div id="comments-container">
          <div className="comment-input-container">
            <input type="text" className="custom-input comment-input" placeholder="Write a comment..." onChange={()=>{this.setState({'comment':event.target.value})}} onKeyPress={this.handleKeyPress}/>
            <input type="text" className="custom-input username-input" placeholder="Enter Username" onChange={()=>{this.setState({'username':event.target.value})}} onKeyPress={this.handleKeyPress}/>
          </div>
          <div className="all-comments-container">
            {(this.props.comments[this.props.postId]||[]).map(comment => <CommentItem postId={this.props.postId} data={comment}/>)}
          </div>
        </div>
      );
    }
    return (
        <div className="comment-container">
          {commentView}
        </div>
    )
  }
}

const mapStateToProps  = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps  = (dispatch) => {
  return {
    saveComment: (post_id, content, username) => dispatch(saveComment(post_id, content, username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);

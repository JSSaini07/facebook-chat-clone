import React from 'react';
import saveSubComment from '../actions/saveSubComment.js';
import {connect} from 'react-redux';

class CommentItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {'show_sub_reply':false, 'comment': null, 'username': null};
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleShowSubComments = this.handleShowSubComments.bind(this);
  }
  handleKeyPress(){
    if(event.keyCode==13){
      if(this.state.username && this.state.comment){
        this.props.saveSubComment(this.props.postId, (this.props.data.id||this.props.data._id),this.state.username, this.state.comment);
      }else {
        return;
      }
    }
  }
  handleShowSubComments(){
    this.setState({'show_sub_reply':true});
  }
  render(){
    if(!this.props.data){
      return <span></span>;
    }
    const last_sub_reply_username = this.props.data.sub_comments.length?this.props.data.sub_comments[this.props.data.sub_comments.length-1].username:'';
    const replies = this.props.data.sub_comments.map((d) => {
      return (
        <div id="reply-item-container">
          <div className="clearfix">
            <div className="profileImage"></div>
            <div className="profile-header-info">
              <span className="username">{d.username}</span>
              <span className="age">{d.created_at}</span>
            </div>
          </div>
          <span className="content">{d.content}</span>
          <span className="reply-button">Reply</span>
        </div>
      )}
    );
    return (
        <div id="comment-item-container">
          <div className="clearfix">
            <div className="profileImage"></div>
            <div className="profile-header-info">
              <span className="username">{this.props.data.username}</span>
              <span className="age">{this.props.data.created_at}</span>
              </div>
          </div>
          <span className="content">{this.props.data.content}</span>
          <span className="reply-button" onClick={this.handleShowSubComments}>Reply</span>
          <div className={"replied-count "+((this.props.data.sub_comments.length && !this.state.show_sub_reply)?'':'hidden')} onClick={this.handleShowSubComments}><span className="profileImage"></span>{last_sub_reply_username+' replied  '+this.props.data.sub_comments.length+' replies'}</div>
          <div className={"sub-comments-container "+(this.state.show_sub_reply?'':'hidden')}>
            <div className="sub-comment-input-container">
              <input type="text" className="custom-input sub-comment-input" placeholder="Write a comment..." onChange={()=>{this.setState({'comment':event.target.value})}} onKeyPress={this.handleKeyPress}/>
              <input type="text" className="custom-input username-input" placeholder="Enter Username" onChange={()=>{this.setState({'username':event.target.value})}} onKeyPress={this.handleKeyPress}/>
            </div>
            {replies}
          </div>
        </div>
    )
  }
}

const mapStateToProps  = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSubComment: (post_id,comment_id,username,comment) => dispatch(saveSubComment(post_id,comment_id,username,comment))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentItem);

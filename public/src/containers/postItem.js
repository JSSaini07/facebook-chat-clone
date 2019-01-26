import React from 'react';
import {connect} from 'react-redux';
import fetchAllComments from '../actions/fetchAllComments.js';

class PostItem extends React.Component {
  constructor(props){
    super(props);
    this.fetchAllComments = this.fetchAllComments.bind(this);
  }
  fetchAllComments(post_id){
    this.props.fetchAllComments(post_id);
  }
  render(){
    let count = this.props.data.comments.length;
    if(this.props.comments && this.props.comments[this.props.data.id||this.props.data._id]){
      count = this.props.comments[this.props.data.id||this.props.data._id].length;
    }
    return (
      <div id="post-item-container">
        <div className="clearfix">
          <div className="profileImage"></div>
          <div className="profile-header-info">
            <span className="username">{this.props.data.username}</span>
            <span className="age">{this.props.data.created_at}</span>
            </div>
        </div>
        <hr/>
        <span className="content">{this.props.data.content}</span>
        <hr/>
        <div className="comment-options-container clearfix">
          <div className="button comment-button" onClick={() => {this.fetchAllComments(this.props.data.id||this.props.data._id)}}>
            <i className="fa fa-comment-dots"></i>
            <span>Comment</span>
          </div>
          <span className="comment-count" onClick={() => {this.fetchAllComments(this.props.data.id||this.props.data._id)}}>{count+' comment'+(count!=1?'s':'')}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllComments: (post_id) => dispatch(fetchAllComments(post_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);

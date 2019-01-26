import React from 'react';
import {connect} from 'react-redux';
import fetchAllPosts from '../actions/fetchAllPosts.js';
import PostItem from './postItem.js';
import CommentsContainer from './commentsContainer.js';

class PostContainer extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchAllPosts();
  }
  render(){
    let allPostView = (
      <div className="empty-posts">
        <i className="fa fa-4x fa-rocket"></i>
        <span>No post present</span>
      </div>
  );
    if(this.props.posts.length){
      allPostView = this.props.posts.map(d =>
        <div>
          <PostItem data={d}/>
          <CommentsContainer postId={d.id||d._id}/>
        </div>
      )
    }
    return (
      <div id="post-container">
        {allPostView}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPosts: () => dispatch(fetchAllPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);

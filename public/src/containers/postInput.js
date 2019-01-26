import React from 'react';
import {connect} from 'react-redux';
import createNewPost from '../actions/createNewPost.js';

class PostInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {content:null, username:null}
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(){
    this.props.createNewPost(this.state.username,this.state.content);
  }
  render(){
    return (
      <div id="create-post-container">
        <textarea className="create-post" placeholder="Write something here..." onChange={()=>{this.setState({content:event.target.value})}}/>
        <div className="post-options clearfix">
          <div className="button submit-post" onClick={this.handleSubmit}>Post</div>
          <input className="custom-input username-input" type="text" placeholder="Enter Username" onChange={()=>{this.setState({username:event.target.value})}}/>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPost: (username, content) => dispatch(createNewPost(username, content))
  }
}

export default connect(null, mapDispatchToProps)(PostInput);

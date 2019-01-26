import React from 'react';
import {connect} from 'react-redux';
import createPostViaSocket from '../actions/createPostViaSocket.js';
import saveCommentViaSocket from '../actions/saveCommentViaSocket.js';
import saveSubCommentViaSocket from '../actions/saveSubCommentViaSocket.js';

class PostSocket extends React.Component {
  constructor(props){
    super(props);
    this.socket = null;
  }
  componentDidMount(){
    this.socket =  new WebSocket('ws://localhost:8080');
    this.socket.onmessage = (data) => {
      data = JSON.parse(data.data);
      const message_type = Object.keys(data)[0];
      data = data[message_type];
      switch(message_type){
        case 'createPostViaSocket': this.props.createPostViaSocket(data.data); return;
        case 'saveCommentViaSocket': this.props.saveCommentViaSocket(data.data, data.post_id); return;
        case 'saveSubCommentViaSocket': this.props.saveSubCommentViaSocket(data.data, data.post_id); return;
      }
    }
  }
  render(){
    return <span></span>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPostViaSocket: (data) => dispatch(createPostViaSocket(data)),
    saveCommentViaSocket: (data, post_id) => dispatch(saveCommentViaSocket(data, post_id)),
    saveSubCommentViaSocket: (data, post_id) => dispatch(saveSubCommentViaSocket(data, post_id))
  }
}

export default connect(null,mapDispatchToProps)(PostSocket);

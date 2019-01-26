import React from 'react';
import PostInput from './postInput.js'
import PostContainer from './postContainer.js'
import PostSocket from './postSocket.js';

class App extends React.Component {
  render(){
    return (
      <div id="app-container">
        <PostInput/>
        <hr/>
        <PostContainer/>
        <PostSocket/>
      </div>
    )
  }
}

export default App;

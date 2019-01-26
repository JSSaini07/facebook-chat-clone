import axios from 'axios';

export default (post_id, username, content) => {
  let req = axios.post('/api/save_comment', {post_id:post_id, username:username,content:content});
  return {
    type:'SAVE_COMMENT',
    payload: req
  }
}

import axios from 'axios';

export default (post_id,comment_id,username,content) => {
  let req = axios.post('/api/save_sub_comment', {post_id:post_id, comment_id:comment_id, username:username,content:content});
  return {
    type:'SAVE_SUB_COMMENT',
    payload: req
  }
}

import axios from 'axios';

export default (post_id) => {
  let req = axios.post('/api/fetch_all_comments',{post_id:post_id});
  return {
    type:'FETCH_ALL_COMMENTS',
    payload: req
  }
}

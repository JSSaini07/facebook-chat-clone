import axios from 'axios';

export default (username, content) => {
  let req = axios.get('/api/fetch_all_posts');
  return {
    type:'FETCH_ALL_POSTS',
    payload: req
  }
}

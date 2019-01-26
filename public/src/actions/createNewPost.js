import axios from 'axios';

export default (username, content) => {
  let req = axios.post('/api/create_post',{
    username: username,
    content: content
  });
  return {
    type:'CREATE_NEW_POST',
    payload: req
  }
}

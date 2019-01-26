import PostReducer from './posts.js';
import CommentsReducer from './comments.js';
import {combineReducers} from 'redux';

export default combineReducers({
  posts: PostReducer,
  comments: CommentsReducer
});

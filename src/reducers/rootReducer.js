import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import bookmarkReducer from './bookmarkReducer';
import likeReducer from './likeReducer';

const rootReducer = combineReducers({
    post: postReducer,
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    comment: commentReducer,
    bookmark: bookmarkReducer,
    like: likeReducer
});

export default rootReducer;

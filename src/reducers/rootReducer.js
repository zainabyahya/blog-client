import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import bookmarkReducer from './bookmarkReducer';

const rootReducer = combineReducers({
    post: postReducer,
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    comment: commentReducer,
    bookmark: bookmarkReducer
});

export default rootReducer;

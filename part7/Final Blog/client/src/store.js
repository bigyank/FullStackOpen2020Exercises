import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
  blogs: blogReducer,
  user: userReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

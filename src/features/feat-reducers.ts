import { combineReducers } from 'redux';

import { postsSlice } from './posts/stores/list/posts.slice';

export const featureReducers = combineReducers({
	posts: postsSlice.reducer,
});

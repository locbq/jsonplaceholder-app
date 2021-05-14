import { configureStore } from '@reduxjs/toolkit';

import albumsReducer from './albums.slice';
import commentsReducer from './comments.slice';
import photosReducer from './photos.slice';
import postsReducer from './posts.slice';
import usersReducer from './users.slice';
import todosReducer from './todos.slice';

const store = configureStore({
  reducer: {
    albums: albumsReducer,
    comments: commentsReducer,
    photos: photosReducer,
    posts: postsReducer,
    users: usersReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

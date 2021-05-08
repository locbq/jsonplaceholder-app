import { configureStore } from '@reduxjs/toolkit';

import albumsReducer from './albums.slice';
import usersReducer from './users.slice';
import photosReducer from './photos.slice';
import commentsReducer from './comments.slice';

export default configureStore({
  reducer: {
    albums: albumsReducer,
    comments: commentsReducer,
    photos: photosReducer,
    users: usersReducer,
  },
});

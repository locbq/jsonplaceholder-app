import { configureStore } from '@reduxjs/toolkit';

import albumsReducer from './albumsSlice';
import usersReducer from './usersSlice';
import photosReducer from './photosSlice';

export default configureStore({
  reducer: {
    albums: albumsReducer,
    users: usersReducer,
    photos: photosReducer,
  },
});

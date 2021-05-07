import { configureStore } from '@reduxjs/toolkit';

import albumsReducer from './albumsSlice';
import usersReducer from './usersSlice';

export default configureStore({
  reducer: {
    albums: albumsReducer,
    users: usersReducer,
  },
});

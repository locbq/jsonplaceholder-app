/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { getPhotoByAlbum } from 'apis/photo/photo';
import { Photo } from 'types/photo/Photo';

export const getPhotos = createAsyncThunk(
  'photos/getPhotos',
  async (albumId: number) => {
    const response = await getPhotoByAlbum(albumId);
    return response.data;
  },
);

interface InitialStateType {
  photoList: Photo[];
  loading: boolean;
}

const initialState: InitialStateType = {
  photoList: [],
  loading: true,
};

const albumsSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: {
    // get photos
    [getPhotos.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPhotos.fulfilled.toString()]: (state, action: PayloadAction<Photo[]>) => {
      state.loading = false;
      state.photoList = [...action.payload];
    },
    [getPhotos.rejected.toString()]: (state) => {
      state.loading = false;
    },
  },
});

export default albumsSlice.reducer;

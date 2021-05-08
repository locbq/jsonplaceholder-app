/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  getAlbumList,
  getAlbumDetail,
} from 'apis/album/album';
import { Album } from 'types/album/Album';

export const getAlbums = createAsyncThunk(
  'albums/getAlbums',
  async () => {
    const response = await getAlbumList();
    return response.data;
  },
);

export const getAlbum = createAsyncThunk(
  'albums/getAlbum',
  async (albumId: number) => {
    const response = await getAlbumDetail(albumId);
    return response.data;
  },
);

interface InitialStateType {
  albumList: Album[];
  albumDetail: Album;
  loading: boolean;
}

const initialState: InitialStateType = {
  albumList: [],
  albumDetail: {
    userId: 0,
    id: 0,
    title: '',
  },
  loading: true,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: {
    // get albums
    [getAlbums.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAlbums.fulfilled.toString()]: (state, action: PayloadAction<Album[]>) => {
      state.loading = false;
      state.albumList = [...action.payload];
    },
    [getAlbums.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get album
    [getAlbum.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAlbum.fulfilled.toString()]: (state, action: PayloadAction<Album>) => {
      state.loading = false;
      state.albumDetail = { ...action.payload };
    },
    [getAlbum.rejected.toString()]: (state) => {
      state.loading = true;
    },
  },
});

export default albumsSlice.reducer;

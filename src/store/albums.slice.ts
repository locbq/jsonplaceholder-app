import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Album } from "types/album/Album";
import { request } from "apis/service";

export const getAlbumList = createAsyncThunk(
  "albums/getAlbumList",
  async () => {
    const response = await request.get("/albums");
    return response.data;
  }
);

export const getAlbumDetail = createAsyncThunk(
  "albums/getAlbumDetail",
  async (albumId: number) => {
    const response = await request.get(`/albums/${albumId}`);
    return response.data;
  }
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
    title: ""
  },
  loading: true
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: {
    // get albums
    [getAlbumList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAlbumList.fulfilled.toString()]: (
      state,
      action: PayloadAction<Album[]>
    ) => {
      state.loading = false;
      state.albumList = [...action.payload];
    },
    [getAlbumList.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get album
    [getAlbumDetail.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getAlbumDetail.fulfilled.toString()]: (
      state,
      action: PayloadAction<Album>
    ) => {
      state.loading = false;
      state.albumDetail = { ...action.payload };
    },
    [getAlbumDetail.rejected.toString()]: (state) => {
      state.loading = true;
    }
  }
});

export default albumsSlice.reducer;

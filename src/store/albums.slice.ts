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
  extraReducers: (builder) => {
    builder
    // get albums
    .addCase(getAlbumList.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAlbumList.fulfilled, (
      state,
      action: PayloadAction<Album[]>
    ) => {
      state.loading = false;
      state.albumList = [...action.payload];
    })
    .addCase(getAlbumList.rejected, (state) => {
      state.loading = false;
    })

    // get album
    .addCase(getAlbumDetail.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAlbumDetail.fulfilled, (
      state,
      action: PayloadAction<Album>
    ) => {
      state.loading = false;
      state.albumDetail = { ...action.payload };
    })
    .addCase(getAlbumDetail.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default albumsSlice.reducer;

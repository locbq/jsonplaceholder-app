import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  listRequestId?: string;
  detailRequestId?: string;
  detailError: boolean;
  listLoading: boolean;
  detailLoading: boolean;
}

const initialState: InitialStateType = {
  albumList: [],
  albumDetail: {
    userId: 0,
    id: 0,
    title: ""
  },
  detailError: false,
  listLoading: true,
  detailLoading: true
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // get albums
    .addCase(getAlbumList.pending, (state, action) => {
      state.listRequestId = action.meta.requestId;
      state.listLoading = true;
    })
    .addCase(getAlbumList.fulfilled, (
      state,
      action
    ) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.listLoading = false;
      state.albumList = [...action.payload];
    })
    .addCase(getAlbumList.rejected, (state, action) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.listLoading = false;
    })

    // get album
    .addCase(getAlbumDetail.pending, (state, action) => {
      state.detailRequestId = action.meta.requestId;
      state.detailLoading = true;
      state.detailError = false;
    })
    .addCase(getAlbumDetail.fulfilled, (
      state,
      action
    ) => {
      if (state.detailRequestId !== action.meta.requestId) return;
      state.detailLoading = false;
      state.albumDetail = { ...action.payload };
    })
    .addCase(getAlbumDetail.rejected, (state, action) => {
      if (state.detailRequestId !== action.meta.requestId) return;
      state.detailLoading = false;
      state.detailError = true;
    });
  }
});

export default albumsSlice.reducer;

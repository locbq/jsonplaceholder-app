import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Photo } from "types/photo/Photo";
import { request } from "apis/service";

export const getPhotoByAlbum = createAsyncThunk(
  "photos/getPhotoByAlbum",
  async (albumId: number) => {
    const response = await request.get("/photos", {
      params: {
        albumId
      }
    });
    return response.data;
  }
);

interface InitialStateType {
  photoList: Photo[];
  listRequestId?: string;
  loading: boolean;
}

const initialState: InitialStateType = {
  photoList: [],
  loading: true
};

const albumsSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // get photos
    .addCase(getPhotoByAlbum.pending, (state, action) => {
      state.listRequestId = action.meta.requestId;
      state.loading = true;
      state.photoList = [];
    })
    .addCase(getPhotoByAlbum.fulfilled, (
      state,
      action
    ) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.loading = false;
      state.photoList = [...action.payload];
    })
    .addCase(getPhotoByAlbum.rejected, (state, action) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.loading = false;
    });
  }
});

export default albumsSlice.reducer;

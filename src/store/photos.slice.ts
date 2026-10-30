import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    .addCase(getPhotoByAlbum.pending, (state) => {
      state.loading = true;
    })
    .addCase(getPhotoByAlbum.fulfilled, (
      state,
      action: PayloadAction<Photo[]>
    ) => {
      state.loading = false;
      state.photoList = [...action.payload];
    })
    .addCase(getPhotoByAlbum.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default albumsSlice.reducer;

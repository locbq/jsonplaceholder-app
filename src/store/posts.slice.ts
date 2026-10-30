import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Post } from "types/post/Post";
import { request } from "apis/service";

export const getPostList = createAsyncThunk(
  "posts/getPostList",
  async (userId?: number) => {
    const response = await request.get("/posts", {
      params: {
        userId
      }
    });
    return response.data;
  }
);

export const getPostDetail = createAsyncThunk(
  "posts/getPost",
  async (id: number) => {
    const response = await request.get(`/posts/${id}`);
    return response.data;
  }
);

interface InitialStateType {
  postList: Post[];
  postDetail: Post;
  listRequestId?: string;
  detailRequestId?: string;
  detailError: boolean;
  listLoading: boolean;
  detailLoading: boolean;
}

const initialState: InitialStateType = {
  postList: [],
  postDetail: {
    userId: 0,
    id: 0,
    title: "",
    body: ""
  },
  detailError: false,
  listLoading: true,
  detailLoading: true
};

const albumsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // get posts
    .addCase(getPostList.pending, (state, action) => {
      state.listRequestId = action.meta.requestId;
      state.listLoading = true;
    })
    .addCase(getPostList.fulfilled, (
      state,
      action
    ) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.listLoading = false;
      state.postList = [...action.payload];
    })
    .addCase(getPostList.rejected, (state, action) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.listLoading = false;
    })

    // get post
    .addCase(getPostDetail.pending, (state, action) => {
      state.detailRequestId = action.meta.requestId;
      state.detailLoading = true;
      state.detailError = false;
    })
    .addCase(getPostDetail.fulfilled, (
      state,
      action
    ) => {
      if (state.detailRequestId !== action.meta.requestId) return;
      state.detailLoading = false;
      state.postDetail = { ...action.payload };
    })
    .addCase(getPostDetail.rejected, (state, action) => {
      if (state.detailRequestId !== action.meta.requestId) return;
      state.detailLoading = false;
      state.detailError = true;
    });
  }
});

export default albumsSlice.reducer;

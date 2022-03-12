import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  loading: boolean;
}

const initialState: InitialStateType = {
  postList: [],
  postDetail: {
    userId: 0,
    id: 0,
    title: "",
    body: ""
  },
  loading: true
};

const albumsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // get posts
    [getPostList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPostList.fulfilled.toString()]: (
      state,
      action: PayloadAction<Post[]>
    ) => {
      state.loading = false;
      state.postList = [...action.payload];
    },
    [getPostList.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get post
    [getPostDetail.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPostDetail.fulfilled.toString()]: (
      state,
      action: PayloadAction<Post>
    ) => {
      state.loading = false;
      state.postDetail = { ...action.payload };
    },
    [getPostDetail.rejected.toString()]: (state) => {
      state.loading = true;
    }
  }
});

export default albumsSlice.reducer;

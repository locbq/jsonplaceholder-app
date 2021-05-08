/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  getPostList,
  getPostDetail,
} from 'apis/post/post';
import { Post } from 'types/post/Post';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (userId?: number) => {
    const response = await getPostList(userId);
    return response.data;
  },
);

export const getPost = createAsyncThunk(
  'posts/getPost',
  async (id: number) => {
    const response = await getPostDetail(id);
    return response.data;
  },
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
    title: '',
    body: '',
  },
  loading: true,
};

const albumsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // get posts
    [getPosts.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled.toString()]: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.postList = [...action.payload];
    },
    [getPosts.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get post
    [getPost.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getPost.fulfilled.toString()]: (state, action: PayloadAction<Post>) => {
      state.loading = false;
      state.postDetail = { ...action.payload };
    },
    [getPost.rejected.toString()]: (state) => {
      state.loading = true;
    },
  },
});

export default albumsSlice.reducer;

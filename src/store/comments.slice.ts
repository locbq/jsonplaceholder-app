/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { getCommentList } from 'apis/comment/comment';
import { Comment } from 'types/comment/Comment';

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (id?: number) => {
    const response = await getCommentList(id);
    return response.data;
  },
);

interface InitialStateType {
  commentList: Comment[];
  loading: boolean;
}

const initialState: InitialStateType = {
  commentList: [],
  loading: true,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    // get comments
    [getComments.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getComments.fulfilled.toString()]: (state, action: PayloadAction<Comment[]>) => {
      state.loading = false;
      state.commentList = [...action.payload];
    },
    [getComments.rejected.toString()]: (state) => {
      state.loading = false;
    },
  },
});

export default commentsSlice.reducer;

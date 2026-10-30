import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Comment } from "types/comment/Comment";
import { request } from "apis/service";

export const getCommentList = createAsyncThunk(
  "comments/getCommentList",
  async (id?: number) => {
    const response = await request.get("/comments", {
      params: {
        postId: id
      }
    });
    return response.data;
  }
);

interface InitialStateType {
  commentList: Comment[];
  listRequestId?: string;
  loading: boolean;
}

const initialState: InitialStateType = {
  commentList: [],
  loading: true
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // get comments
    .addCase(getCommentList.pending, (state, action) => {
      state.listRequestId = action.meta.requestId;
      state.loading = true;
      state.commentList = [];
    })
    .addCase(getCommentList.fulfilled, (
      state,
      action
    ) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.loading = false;
      state.commentList = [...action.payload];
    })
    .addCase(getCommentList.rejected, (state, action) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.loading = false;
    });
  }
});

export default commentsSlice.reducer;

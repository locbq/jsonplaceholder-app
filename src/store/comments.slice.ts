import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    .addCase(getCommentList.pending, (state) => {
      state.loading = true;
    })
    .addCase(getCommentList.fulfilled, (
      state,
      action: PayloadAction<Comment[]>
    ) => {
      state.loading = false;
      state.commentList = [...action.payload];
    })
    .addCase(getCommentList.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default commentsSlice.reducer;

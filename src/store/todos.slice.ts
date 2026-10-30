import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TodosListRequest, Todo } from "types/todos/Todo";
import { request } from "apis/service";

export const getTodosList = createAsyncThunk(
  "todos/getTodosList",
  async (params?: TodosListRequest) => {
    const response = await request.get("/todos", {
      params: {
        ...params
      }
    });
    return response.data;
  }
);

interface InitialStateType {
  todoList: Todo[];
  listRequestId?: string;
  loading: boolean;
}

const initialState: InitialStateType = {
  todoList: [],
  loading: true
};

const albumsSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // get todos
    .addCase(getTodosList.pending, (state, action) => {
      state.listRequestId = action.meta.requestId;
      state.loading = true;
    })
    .addCase(getTodosList.fulfilled, (
      state,
      action
    ) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.loading = false;
      state.todoList = [...action.payload];
    })
    .addCase(getTodosList.rejected, (state, action) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.loading = false;
    });
  }
});

export default albumsSlice.reducer;

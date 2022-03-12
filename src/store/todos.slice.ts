import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  extraReducers: {
    // get todos
    [getTodosList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getTodosList.fulfilled.toString()]: (
      state,
      action: PayloadAction<Todo[]>
    ) => {
      state.loading = false;
      state.todoList = [...action.payload];
    },
    [getTodosList.rejected.toString()]: (state) => {
      state.loading = false;
    }
  }
});

export default albumsSlice.reducer;

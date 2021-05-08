/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { getTodosList } from 'apis/todos/todos';
import { TodosListRequest, Todo } from 'types/todos/Todo';

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (params?: TodosListRequest) => {
    const response = await getTodosList(params);
    return response.data;
  },
);

interface InitialStateType {
  todoList: Todo[];
  loading: boolean;
}

const initialState: InitialStateType = {
  todoList: [],
  loading: true,
};

const albumsSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    // get todos
    [getTodos.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getTodos.fulfilled.toString()]: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.todoList = [...action.payload];
    },
    [getTodos.rejected.toString()]: (state) => {
      state.loading = false;
    },
  },
});

export default albumsSlice.reducer;

/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  getUserList,
  getUserDetail,
} from 'apis/user/user';
import { User } from 'types/user/User';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const response = await getUserList();
    return response.data;
  },
);

export const getUser = createAsyncThunk(
  'users/getUser',
  async (id: number) => {
    const response = await getUserDetail(id);
    return response.data;
  },
);

interface InitialStateType {
  userList: User[];
  userDetail: User;
  loading: boolean;
}

const initialState: InitialStateType = {
  userList: [],
  userDetail: {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  },
  loading: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    // get user list
    [getUsers.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled.toString()]: (state, action: PayloadAction<User[]>) => {
      if (!action.payload) return;
      state.userList = [...action.payload];
      state.loading = false;
    },
    [getUsers.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get user detail
    [getUser.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUser.fulfilled.toString()]: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.userDetail = { ...action.payload };
    },
    [getUser.rejected.toString()]: (state) => {
      state.loading = true;
    },
  },
});

export default usersSlice.reducer;

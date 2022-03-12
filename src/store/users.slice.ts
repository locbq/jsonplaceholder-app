import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "types/user/User";
import { request } from "apis/service";

export const getUserList = createAsyncThunk("users/getUserList", async () => {
  const response = await request.get("/users");
  return response.data;
});

export const getUserDetail = createAsyncThunk(
  "users/getUserDetail",
  async (id: number) => {
    const response = await request.get(`/users/${id}`);
    return response.data;
  }
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
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  },
  loading: true
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // get user list
    [getUserList.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUserList.fulfilled.toString()]: (
      state,
      action: PayloadAction<User[]>
    ) => {
      if (!action.payload) return;
      state.userList = [...action.payload];
      state.loading = false;
    },
    [getUserList.rejected.toString()]: (state) => {
      state.loading = false;
    },

    // get user detail
    [getUserDetail.pending.toString()]: (state) => {
      state.loading = true;
    },
    [getUserDetail.fulfilled.toString()]: (
      state,
      action: PayloadAction<User>
    ) => {
      state.loading = false;
      state.userDetail = { ...action.payload };
    },
    [getUserDetail.rejected.toString()]: (state) => {
      state.loading = true;
    }
  }
});

export default usersSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  listRequestId?: string;
  detailRequestId?: string;
  detailError: boolean;
  listLoading: boolean;
  detailLoading: boolean;
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
  detailError: false,
  listLoading: true,
  detailLoading: true
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // get user list
    .addCase(getUserList.pending, (state, action) => {
      state.listRequestId = action.meta.requestId;
      state.listLoading = true;
    })
    .addCase(getUserList.fulfilled, (
      state,
      action
    ) => {
      if (state.listRequestId !== action.meta.requestId) return;
      if (!action.payload) return;
      state.userList = [...action.payload];
      state.listLoading = false;
    })
    .addCase(getUserList.rejected, (state, action) => {
      if (state.listRequestId !== action.meta.requestId) return;
      state.listLoading = false;
    })

    // get user detail
    .addCase(getUserDetail.pending, (state, action) => {
      state.detailRequestId = action.meta.requestId;
      state.detailLoading = true;
      state.detailError = false;
    })
    .addCase(getUserDetail.fulfilled, (
      state,
      action
    ) => {
      if (state.detailRequestId !== action.meta.requestId) return;
      state.detailLoading = false;
      state.userDetail = { ...action.payload };
    })
    .addCase(getUserDetail.rejected, (state, action) => {
      if (state.detailRequestId !== action.meta.requestId) return;
      state.detailLoading = false;
      state.detailError = true;
    });
  }
});

export default usersSlice.reducer;

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
  extraReducers: (builder) => {
    builder
    // get user list
    .addCase(getUserList.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUserList.fulfilled, (
      state,
      action: PayloadAction<User[]>
    ) => {
      if (!action.payload) return;
      state.userList = [...action.payload];
      state.loading = false;
    })
    .addCase(getUserList.rejected, (state) => {
      state.loading = false;
    })

    // get user detail
    .addCase(getUserDetail.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUserDetail.fulfilled, (
      state,
      action: PayloadAction<User>
    ) => {
      state.loading = false;
      state.userDetail = { ...action.payload };
    })
    .addCase(getUserDetail.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default usersSlice.reducer;

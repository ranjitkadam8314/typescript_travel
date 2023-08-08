import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import User from "../../shared/models/UserModel";

const initialState: User = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (store, { payload }) => payload,
    removeUser: () => ({}),
  },
});

export const { addUser, removeUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.loggedUser;
export default authSlice.reducer;

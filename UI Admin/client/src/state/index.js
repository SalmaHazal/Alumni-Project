import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});

export const {
  setLogin,
  setLogout,
} = authSlice.actions;
export default authSlice.reducer;

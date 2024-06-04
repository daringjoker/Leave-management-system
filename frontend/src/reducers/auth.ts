import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  },
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    resetAuthenticated: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, resetAuthenticated } = authSlice.actions;

export default authSlice.reducer;

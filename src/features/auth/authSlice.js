import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: JSON.parse(localStorage.getItem("jwt")) || null,
  id: JSON.parse(localStorage.getItem("id")) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("jwt", JSON.stringify(action.payload));
      state.jwt = action.payload;
    },
    current: (state, action) => {
      localStorage.setItem("id", JSON.stringify(action.payload));
      state.id = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("id");
      state.jwt = null;
      state.id = null;
    },
  },
});

export const { login, logout, current } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("jwt")) || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("jwt", JSON.stringify(action.payload));
      state.value = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("jwt");
      state.value = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  password: false,
  email: false,
};

export const validationSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    passwordStatus: (state, action) => {
      state.password = action.payload;
    },
    emailStatus: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { passwordStatus, emailStatus } = validationSlice.actions;

export default validationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentData: {},
};

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    currentUserData: (state, action) => {
      state.currentData = action.payload;
    },
  },
});

export const { currentUserData } = currentSlice.actions;

export default currentSlice.reducer;

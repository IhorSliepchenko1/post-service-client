import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    current: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { current } = currentSlice.actions;

export default currentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: ``,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    errorMessage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { errorMessage } = errorSlice.actions;

export default errorSlice.reducer;

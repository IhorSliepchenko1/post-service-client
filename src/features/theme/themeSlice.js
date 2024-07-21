import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: `dark`,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    colorTheme: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { colorTheme } = themeSlice.actions;

export default themeSlice.reducer;

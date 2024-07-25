import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentData: {},
  countMails: 0,
};

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    currentUserData: (state, action) => {
      state.currentData = action.payload;
    },

    countMailsUser: (state, action) => {
      state.countMails = action.payload;
    },
  },
});

export const { currentUserData, countMailsUser } = currentSlice.actions;

export default currentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mailsDataAll: [],
  mailsCount: 0,
};

export const mailSliceAll = createSlice({
  name: "mailsAll",
  initialState,
  reducers: {
    mailsDataAll: (state, action) => {
      state.mailsDataAll = action.payload;
    },

    mailsCountLimit: (state, action) => {
      state.mailsCount = action.payload;
    },
  },
});

export const { mailsDataAll, mailsCountLimit } = mailSliceAll.actions;

export default mailSliceAll.reducer;

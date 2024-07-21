import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mailsData: [],
};

export const mailSlice = createSlice({
  name: "mails",
  initialState,
  reducers: {
    mailsDataCurrentUser: (state, action) => {
      state.mailsData = action.payload;
    },
  },
});

export const { mailsDataCurrentUser } = mailSlice.actions;

export default mailSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersDataAll: [],
  usersCount: 0,
};

export const usersSliceAll = createSlice({
  name: "usersAll",
  initialState,
  reducers: {
    usersDataAll: (state, action) => {
      state.usersDataAll = action.payload;
    },

    usersCountLimit: (state, action) => {
      state.usersCount = action.payload;
    },
  },
});

export const { usersDataAll, usersCountLimit } = usersSliceAll.actions;

export default usersSliceAll.reducer;

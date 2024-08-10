import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ jwt, limit, page, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users`, {
        headers: {
          "Content-Type": "application/json",
          authorization: jwt,
        },
        params: {
          _limit: limit,
          _page: page,
          id,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const usersSliceAll = createSlice({
  name: "users",
  initialState: {
    data: [],
    count: 0,
    status: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.users;
        state.count = action.payload.countUsers;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default usersSliceAll.reducer;

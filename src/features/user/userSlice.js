import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ jwt, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    status: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })

      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

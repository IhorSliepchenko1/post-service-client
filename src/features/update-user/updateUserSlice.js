import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchUpdate = createAsyncThunk(
  "update/fetchUpdate",
  async ({ data, jwt, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/update-user`,
        { ...data, userId: id },
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

export const updateUserSlice = createSlice({
  name: "users",
  initialState: {
    status: "idle",
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUpdate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchUpdate.fulfilled, (state) => {
        state.status = "succeeded";
      })

      .addCase(fetchUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default updateUserSlice.reducer;

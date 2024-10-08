import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchCurrent = createAsyncThunk(
  "current/fetchCurrent",
  async ({ jwt, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/current`, {
        headers: {
          "Content-Type": "application/json",
          authorization: jwt,
        },
        params: {
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

export const currentSlice = createSlice({
  name: "current",

  initialState: {
    userData: {},
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchCurrent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default currentSlice.reducer;

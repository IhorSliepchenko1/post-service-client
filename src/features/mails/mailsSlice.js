import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchMails = createAsyncThunk(
  "mails/fetchMails",
  async ({ jwt, limit, page, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/mails`, {
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

const mailSlice = createSlice({
  name: "mails",
  initialState: {
    data: [],
    count: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.mails;
        state.count = action.payload.count;
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default mailSlice.reducer;

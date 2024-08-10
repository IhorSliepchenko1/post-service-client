import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchCreateMail = createAsyncThunk(
  "create-mail/fetchCreateMail",
  async ({ formData, jwt }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-mails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

export const createMailSlice = createSlice({
  name: "current",

  initialState: {
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateMail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCreateMail.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchCreateMail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default createMailSlice.reducer;

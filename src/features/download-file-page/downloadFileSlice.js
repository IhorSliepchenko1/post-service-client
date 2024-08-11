import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchDownloadFile = createAsyncThunk(
  "file/fetchDownloadFile",
  async ({ api, jwt, id, formatDate, fileGenerate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/${api}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: jwt,
        },
        params: {
          id,
        },
      });

      const respData = response.data.mails.map((mail) => ({
        ...mail,
        createdAt: formatDate(mail.createdAt),
      }));

      fileGenerate(respData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const downloadFileSlice = createSlice({
  name: "download-file",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDownloadFile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDownloadFile.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchDownloadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default downloadFileSlice.reducer;

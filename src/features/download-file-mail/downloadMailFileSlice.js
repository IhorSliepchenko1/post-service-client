import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchDownloadMailFile = createAsyncThunk(
  "file-mail/fetchDownloadMailFile",
  async (file, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/download/${encodeURIComponent(file)}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file);
      document.body.appendChild(link);
      link.click();
      link.remove();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const downloadMailFileSlice = createSlice({
  name: "download-file-mail",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDownloadMailFile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDownloadMailFile.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchDownloadMailFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default downloadMailFileSlice.reducer;

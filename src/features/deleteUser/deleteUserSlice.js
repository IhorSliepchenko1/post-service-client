import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchDelete = createAsyncThunk(
  "delete/fetchUpdate",
  async ({ jwt, id }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/delete-mails/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      );

      const response = await axios.delete(
        `${BASE_URL}/api/users-delete/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      );

      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteUserSlice = createSlice({
  name: "delete",
  initialState: {
    message: "",
    status: "idle",
    error: null,
  },

  reducers: {
    clearState: (state) => {
      state.message = "";
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchDelete.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })

      .addCase(fetchDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearState } = deleteUserSlice.actions;
export default deleteUserSlice.reducer;

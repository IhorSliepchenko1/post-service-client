import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async ({ data, api }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/${api}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (api === `register`) {
        return;
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    status: "idle",
    error: null,
    userData: JSON.parse(localStorage.getItem("user")) || {},
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem(`user`);
      state.status = "idle";
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = action.payload ? `succeeded` : `idle`;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.userData = action.payload;
      })

      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

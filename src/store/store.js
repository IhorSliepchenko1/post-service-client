import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import errorSlice from "../features/error/errorSlice";
import validationSlice from "../features/validation/validationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    error: errorSlice,
    validation: validationSlice,
  },
});

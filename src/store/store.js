import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import currentSlice from "../features/current/currentSlice";
import errorSlice from "../features/error/errorSlice";
import validationSlice from "../features/validation/validationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    current: currentSlice,
    error: errorSlice,
    validation: validationSlice,
  },
});

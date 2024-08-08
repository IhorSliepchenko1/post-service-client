import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import errorSlice from "../features/error/errorSlice";
import currentSlice from "../features/current/currentSlice";
import themeSlice from "../features/theme/themeSlice";
import mailSlice from "../features/mails/mailsSlice";
import usersSliceAll from "../features/all-users/allUsersSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    error: errorSlice,
    currentSlice: currentSlice,
    theme: themeSlice,
    mails: mailSlice,
    usersAll: usersSliceAll,
    user: userSlice,
  },
});

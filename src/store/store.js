import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import currentSlice from "../features/current/currentSlice";
import mailSlice from "../features/mails/mailsSlice";
import usersSliceAll from "../features/all-users/allUsersSlice";
import userSlice from "../features/user/userSlice";
import updateUserSlice from "./../features/update-user/updateUserSlice";
import createMailSlice from "../features/create-mail/createMailSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    currentSlice: currentSlice,
    mails: mailSlice,
    users: usersSliceAll,
    user: userSlice,
    updateUser: updateUserSlice,
    createMail: createMailSlice,
  },
});

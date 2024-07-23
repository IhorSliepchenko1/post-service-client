import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config";

import { errorMessage } from "./../features/error/errorSlice";
import { useDispatch } from "react-redux";
import { currentUserData } from "../features/current/currentSlice";

export const useMethod = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    token: "",
    name: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const universalGet = async (token, userId, api) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/${api}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            userId: userId,
          },
        }
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const mailsGet = async (token, userId, api, limit, page) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/${api}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          userId: userId,
        },
        params: {
          _limit: limit,
          _page: page,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (token, userId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/update-user`,
        { ...form, userId },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
            userId: userId,
          },
        }
      );

      dispatch(currentUserData(response.data));
      return response;
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
  };

  return { universalGet, mailsGet, updateUser, changeHandler, updateUser };
};

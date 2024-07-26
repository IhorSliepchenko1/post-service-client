import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config";

import { errorMessage } from "../features/error/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { currentUserData } from "../features/current/currentSlice";

export const useMethod = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { jwt, id } = state.auth;

  const [form, setForm] = useState({
    email: "",
    token: "",
    name: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // AXIOS
  const universalGet = async (api) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/${api}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
          params: {
            id,
          },
        }
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  //
  const getWithParams = async (api, limit, page) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/${api}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: jwt,
        },
        params: {
          _limit: limit,
          _page: page,
          id,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const updateUser = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/update-user`,
        { ...form, userId: id },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      );

      dispatch(currentUserData(response.data));
      return response;
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
  };
  const createMails = async (mailsInfo, info) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/create-mails`,
        { ...mailsInfo, ...info },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      );

      return response;
    } catch (error) {
      console.log(error.response.data.error);
      dispatch(errorMessage(error.response.data.error));
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      );

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    universalGet,
    getWithParams,
    updateUser,
    changeHandler,
    updateUser,
    createMails,
    getUserById,
  };
};

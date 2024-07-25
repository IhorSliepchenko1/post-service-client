import axios from "axios";
import { useState } from "react";

import { errorMessage } from "../features/error/errorSlice";
import { useDispatch } from "react-redux";
import { BASE_URL, headers } from "../config";
export const useRegister = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    adminToken: "",
    token: "",
  });

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const apiHandler = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/register`,
        { ...form },
        { headers: headers }
      );

      return response;
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
  };

  return { changeHandler, apiHandler };
};

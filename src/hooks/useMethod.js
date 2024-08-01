import axios from "axios";
import { BASE_URL } from "../config";
import { errorMessage } from "../features/error/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { currentUserData } from "../features/current/currentSlice";
import { logout } from "../features/auth/authSlice";
import { userData } from "../features/user/userSlice";

export const useMethod = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { jwt, id } = state.auth;

  let changeHandler = () => {
    console.log(12);
  };

  // регистрация и логин
  const userAuth = async (router, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/${router}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
  };

  const getInformation = async (api) => {
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
  const updateUser = async (data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/update-user`,
        { ...data, userId: id },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      );
      if (data.password === "") {
        dispatch(currentUserData(response.data));
      } else {
        dispatch(logout());
      }

      return response;
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
  };
  const updateUserById = async (id, data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/update-user`,
        { ...data, userId: id },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      );

      dispatch(userData(response.data));

      return response;
    } catch (err) {
      dispatch(errorMessage(err.response.data.error));
    }
  };
  const createMails = async (mailsInfo, info, file) => {
    try {
      const formData = new FormData();
      formData.append("from", info.from);
      formData.append("name", info.name);
      formData.append("token", info.token);
      formData.append("authorId", info.authorId);
      formData.append("to", mailsInfo.to);
      formData.append("subject", mailsInfo.subject);
      formData.append("content", mailsInfo.content);
      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post(
        `${BASE_URL}/api/create-mails`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
  const deleteAllMailsByUserId = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/delete-mails/${id}`,

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
  const deleteUserById = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/users-delete/${id}`,

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
  const downloadFile = async (file) => {
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
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    }
  };

  return {
    userAuth,
    getInformation,
    getWithParams,
    updateUser,
    changeHandler,
    createMails,
    getUserById,
    deleteAllMailsByUserId,
    deleteUserById,
    updateUserById,
    downloadFile,
  };
};

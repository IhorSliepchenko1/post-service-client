import axios from "axios";
import { BASE_URL } from "../config";
import { userData } from "../features/user/userSlice";

export const useMethod = () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
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

  return {
    getUserById,
    updateUserById,
    deleteAllMailsByUserId,
    deleteUserById,
  };
};

import axios from "axios";
import { BASE_URL, headers } from "../config";

export const useMethod = () => {
  const currentUser = async (token, userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/current`,

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

  const getAllMails = async (token, userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/mails`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
          userId: userId,
        },
      });

      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return { currentUser, getAllMails };
};

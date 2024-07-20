import axios from "axios";
import { BASE_URL } from "../config";

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

  return { currentUser };
};

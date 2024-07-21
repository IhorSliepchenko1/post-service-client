import axios from "axios";
import { BASE_URL } from "../config";

export const useMethod = () => {
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
  // const mailsGet = async (token, userId, api) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/api/${api}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: token,
  //         userId: userId,
  //       },
  //     });

  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return { universalGet };
};

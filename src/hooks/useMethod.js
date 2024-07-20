import axios from "axios";
import { BASE_URL, headers } from "../config";

export const useMethod = () => {
  const currentUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/current`, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { currentUser };
};

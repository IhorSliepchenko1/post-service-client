import axios from "axios";
import { BASE_URL } from "../config";

export const useDownloadAllPages = () => {
  const downloadAllPages = async (api, jwt, id, formatDate, fileGenerate) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/${api}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: jwt,
        },
        params: {
          id,
        },
      });

      const respData = response.data.mails.map((mail) => ({
        ...mail,
        createdAt: formatDate(mail.createdAt),
      }));

      fileGenerate(respData);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { downloadAllPages };
};

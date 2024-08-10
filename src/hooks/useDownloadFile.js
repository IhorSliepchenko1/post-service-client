import axios from "axios";
import { BASE_URL } from "../config";

export const useDownloadFile = () => {
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

  return { downloadFile };
};

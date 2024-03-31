import { useStorage } from "@/providers/storageProvider";
import axios from "axios";

const useScoringApiInstance = () => {
  const { endpoint } = useStorage();
  return axios.create({
    baseURL: `http://${endpoint}/api/v1/`,
  });
};

export default useScoringApiInstance;

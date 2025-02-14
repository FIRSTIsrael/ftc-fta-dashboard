import { useStorage } from "@/providers/storageProvider";
import axios from "axios";
import { useMemo } from "react";

const useScoringApiInstance = () => {
  const { endpoint, apiKey } = useStorage();
  const instance = useMemo(
    () =>
      axios.create({
        baseURL: `http://${endpoint}/api/v1/`,
        headers: {
          Authorization: apiKey,
        },
      }),
    [endpoint, apiKey]
  );
  return instance;
};

export default useScoringApiInstance;

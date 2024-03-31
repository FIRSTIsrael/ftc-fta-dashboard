import { type AxiosInstance, AxiosResponse } from "axios";

export const get = async (instance: AxiosInstance, url: string) => {
  try {
    return (
      await instance.get(url, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
    ).data;
  } catch (e) {
    return null;
  }
};

export const deconstructFirstObject = async (
  response: Promise<AxiosResponse["data"]>,
  firstObjectName: string
) => (await response)[firstObjectName];

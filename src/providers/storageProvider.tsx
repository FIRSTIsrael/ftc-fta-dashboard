"use client";

import { DEFAULT_STORED_DATA, LOCAL_STORAGE_KEY } from "@/constants";
import { StoredData, StoredDataType } from "@/Models/storage";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const StorageContext = createContext<
  {
    setData: <T extends keyof StoredDataType>(
      key: T,
      value: SetStateAction<StoredDataType[T]>
    ) => void;
    isInitiated: boolean;
  } & StoredDataType
>({
  ...DEFAULT_STORED_DATA,
  isInitiated: false,
  setData: () => {},
});

export const useStorage = () => useContext(StorageContext);

const loadData = (): StoredDataType => {
  const savedData = JSON.parse(
    localStorage?.getItem(LOCAL_STORAGE_KEY) ||
      JSON.stringify(DEFAULT_STORED_DATA)
  );

  return StoredData.safeParse(savedData).success
    ? savedData
    : DEFAULT_STORED_DATA;
};

const saveData = (storedData: StoredDataType): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));
};

export const StorageProvider = ({ children }: React.PropsWithChildren) => {
  const [storedData, setStoredData] =
    useState<StoredDataType>(DEFAULT_STORED_DATA);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);

  useEffect(() => {
    setStoredData(loadData());
    setInitialLoaded(true);
  }, []);

  useEffect(() => {
    if (storedData && initialLoaded) {
      saveData(storedData);
    }
  }, [storedData, initialLoaded]);

  const setData = <T extends keyof StoredDataType>(
    key: T,
    value: SetStateAction<StoredDataType[T]>
  ) => {
    setStoredData((prev) => ({
      ...prev,
      [key]: typeof value === "function" ? value(prev[key]) : value,
    }));
  };

  return (
    <StorageContext.Provider
      value={{ ...storedData, setData, isInitiated: initialLoaded }}
    >
      {children}
    </StorageContext.Provider>
  );
};

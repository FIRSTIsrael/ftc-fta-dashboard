"use client";

import { createContext, useContext, useState } from "react";

type APIKeyStatus = "LOADING" | "INITIAL" | "WAITING" | "ACTIVE";

const SettingsContext = createContext<{
  apiKeyStatus: APIKeyStatus;
  setApiKeyStatus: (status: APIKeyStatus) => void;
}>({
  apiKeyStatus: "LOADING",
  setApiKeyStatus: () => {},
});

export const useSettingsContext = () => useContext(SettingsContext);

export const SettingsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [apiKeyStatus, setApiKeyStatus] = useState<APIKeyStatus>("LOADING");

  return (
    <SettingsContext.Provider value={{ apiKeyStatus, setApiKeyStatus }}>
      {children}
    </SettingsContext.Provider>
  );
};

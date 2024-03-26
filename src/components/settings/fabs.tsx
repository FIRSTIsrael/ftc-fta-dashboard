"use client";

import SettingsPage from "./settingsPage";
import Logs from "./logs";
import ThemeToggle from "./themeToggle";
import FullScreen from "./fullScreen";
import { useEffect, useState } from "react";
import { BUTTONS_FADE_DELAY } from "@/constants";
import { cn } from "@/lib/classNames";

const Fabs = () => {
  const [lastMovement, setLastMovement] = useState<number>(Math.min());
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mousemove", ({ timeStamp }) =>
      setLastMovement(timeStamp)
    );

    return () => {
      document.removeEventListener("mousemove", ({ timeStamp }) =>
        setLastMovement(timeStamp)
      );
    };
  });

  useEffect(() => {
    setShown(true);
    const timeout = setTimeout(() => {
      setShown(false);
    }, BUTTONS_FADE_DELAY);
    return () => {
      clearTimeout(timeout);
    };
  }, [lastMovement]);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 flex gap-2 duration-500 opacity-100",
        {
          "pointer-events-none": !shown,
          "opacity-0": !shown,
        }
      )}
    >
      <Logs />
      <SettingsPage />
      <ThemeToggle />
      <FullScreen />
    </div>
  );
};

export default Fabs;

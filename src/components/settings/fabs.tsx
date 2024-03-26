"use client";

import Expand from "@/assets/svgs/expand";
import { Button } from "@/components/ui/button";
import SettingsPage from "./settingsPage";
import Logs from "./logs";
import ThemeToggle from "./themeToggle";
import FullScreen from "./fullScreen";

const Fabs = () => {
  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <Logs />
      <SettingsPage />
      <ThemeToggle />
      <FullScreen />
    </div>
  );
};

export default Fabs;

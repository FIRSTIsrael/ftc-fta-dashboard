"use client";

import Expand from "@/assets/svgs/expand";
import { Button } from "@/components/ui/button";
import SettingsPage from "./settingsPage";
import Logs from "./logs";
import ThemeToggle from "./themeToggle";

const Fabs = () => {
  return (
    <div className="fixed bottom-2 right-2 flex gap-1 bg-zinc-100 p-1 rounded-lg dark:bg-zinc-900">
      <Logs />
      <SettingsPage />
      <ThemeToggle />
      {/* TODO: use the button */}
      <Button variant="outline" size="icon" disabled>
        <Expand className=" fill-current w-3" />
      </Button>
    </div>
  );
};

export default Fabs;

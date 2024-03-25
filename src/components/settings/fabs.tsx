"use client";

import Expand from "@/assets/svgs/expand";
import { Button } from "@/components/ui/button";
import SettingsPage from "./settingsPage";
import Logs from "./logs";

const Fabs = () => {
  return (
    <div className="fixed bottom-4 right-4 flex gap-2">
      <Logs />
      <SettingsPage />
      {/* TODO: use the button */}
      <Button variant="outline" size="sm" disabled>
        <Expand className=" fill-current w-3" />
      </Button>
    </div>
  );
};

export default Fabs;

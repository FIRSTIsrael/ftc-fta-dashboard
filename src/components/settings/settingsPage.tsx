"use client";

import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useStorage } from "@/providers/storageProvider";
import {
  SettingsContextProvider,
  useSettingsContext,
} from "@/providers/settingsProvider";
import EventList from "./eventList";
import ApiKey from "./apiKey";

const SettingsPage = () => {
  const { endpoint, setData } = useStorage();
  const { apiKeyStatus } = useSettingsContext();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon className="w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>FTC FTA Dashboard</DialogTitle>
          <DialogDescription>
            Here you can configure the FTCLive connection.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endpoint">Endpoint</Label>
            <Input
              id="endpoint"
              value={endpoint}
              onChange={(e) => {
                setData("endpoint", e.target.value);
                // If the endpoint changes, clear the API key
                if (e.target.value !== endpoint) {
                  setData("apiKey", "");
                }
              }}
              className="col-span-3"
            />
          </div>
          <ApiKey />
          {apiKeyStatus === "ACTIVE" && (
            <>
              <Separator />
              <EventList />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SettingsPageWithProvider = () => {
  return (
    <SettingsContextProvider>
      <SettingsPage />
    </SettingsContextProvider>
  );
};

export default SettingsPageWithProvider;

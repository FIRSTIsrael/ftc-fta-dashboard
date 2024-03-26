"use client";

import Gear from "@/assets/svgs/gear";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import EventList from "./eventList";
import { useStorage } from "@/providers/storageProvider";

const SettingsPage = () => {
  const { endpoint, setData } = useStorage();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Gear className="fill-current w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>FTC FTA Dashboard</DialogTitle>
          <DialogDescription>
            Here you can configure the FTCLive connection
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endpoint" className="text-right">
              Endpoint
            </Label>
            <Input
              id="endpoint"
              value={endpoint}
              onChange={(newValue) =>
                setData("endpoint", newValue.target.value)
              }
              className="col-span-3"
            />
          </div>
          <Separator />
          <div>
            <EventList />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPage;

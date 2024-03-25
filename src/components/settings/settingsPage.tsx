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

const SettingsPage = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm">
        <Gear className=" fill-white w-4" />
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
            defaultValue="localhost"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Connect</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default SettingsPage;

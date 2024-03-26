import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TerminalIcon } from "lucide-react";

//TODO: Do it
const Logs = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="icon" disabled>
        <TerminalIcon className="w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">Logs goes here</DialogContent>
  </Dialog>
);

export default Logs;

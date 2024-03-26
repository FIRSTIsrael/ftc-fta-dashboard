import Terminal from "@/assets/svgs/terminal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Logs = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="icon">
        <Terminal className=" fill-current w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">Logs goes here</DialogContent>
  </Dialog>
);

export default Logs;

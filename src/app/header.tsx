import FIRSTTechChallenge from "@/assets/svgs/firstTechChallenge";
import { Card } from "@/components/ui/card";
import Time from "./time";
import Indicator from "./indicator";

const Header = () => (
  <Card className="flex justify-between items-center p-6">
    <FIRSTTechChallenge className="w-[8rem]" />
    <div className="flex items-center gap-4">
      <Indicator />
      <Time />
    </div>
  </Card>
);

export default Header;

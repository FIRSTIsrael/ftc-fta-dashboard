import FIRSTTechChallenge from "@/assets/svgs/firstTechChallenge";
import { Card } from "@/components/ui/card";
import Time from "./time";

const Header = () => (
  <Card className="flex justify-between items-center p-6">
    <FIRSTTechChallenge className="w-[8rem]" />
    <Time />
  </Card>
);

export default Header;

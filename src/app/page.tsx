import Event from "@/components/event/event";
import Header from "./header";
import Fabs from "@/components/settings/fabs";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 p-4 h-[100vh]">
        <Header />
        <div className="grow flex w-full gap-4">
          <Event />
          <Event />
        </div>
      </div>
      <Fabs />
    </>
  );
}

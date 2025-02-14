"use client";

import Event from "@/components/event/event";
import Header from "./header";
import Fabs from "@/components/settings/fabs";
import { useStorage } from "@/providers/storageProvider";

export default function Home() {
  const { events, isInitiated } = useStorage();

  return (
    <>
      <div className="flex flex-col gap-4 p-4 h-[100svh]">
        <Header />
        <div className="grow flex w-full gap-4 flex-col md:flex-row">
          {isInitiated ? (
            <>
              {events.map((eventCode) => (
                <Event key={eventCode} eventCode={eventCode} />
              ))}
              {events.length === 0 && (
                <div className="flex-grow flex items-center justify-center text-center">
                  <h1 className="text-gray-500">
                    No events selected. Go to settings to select events.
                  </h1>
                </div>
              )}
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-center">
              <h1 className="text-gray-500">Loading...</h1>
            </div>
          )}
        </div>
      </div>
      <Fabs />
    </>
  );
}

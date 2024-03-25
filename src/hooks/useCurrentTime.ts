import { useEffect, useState } from "react";

const useCurrentTime = () => {
  const [time, setTime] = useState<{
    synced: boolean;
    hours: number;
    minutes: number;
    seconds: number;
    decisecond: number;
    epoch: number;
  }>({
    synced: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    decisecond: 0,
    epoch: 0,
  });

  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const now = new Date();
    setTime({
      synced: true,
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      decisecond: Math.ceil(now.getMilliseconds() / 100),
      epoch: now.getTime(),
    });
  }, []);

  useEffect(() => {
    if (isSyncing) {
      const now = new Date().getSeconds();
      const interval = setInterval(() => {
        const catcher = new Date();
        if (now !== catcher.getSeconds()) {
          setTime({
            synced: true,
            hours: catcher.getHours(),
            minutes: catcher.getMinutes(),
            seconds: catcher.getSeconds(),
            decisecond: Math.ceil(catcher.getMilliseconds() / 100),
            epoch: catcher.getTime(),
          });
          setIsSyncing(false);
        }
      }, 1);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isSyncing]);

  useEffect(() => {
    if (time.seconds === 0) {
      setIsSyncing(true);
    } else {
      const timeout = setTimeout(() => {
        const now = new Date();
        setTime({
          synced: true,
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
          decisecond: Math.ceil(now.getMilliseconds() / 100),
          epoch: now.getTime(),
        });
      }, 100);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [time]);

  return time;
};

export default useCurrentTime;

import React, { useEffect, useState } from "react";
import feed from "../utils/feed";

const Time: React.FC = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const result = feed.remainTime();
      setTime(result);
    }, 1000);
  }, []);
  return <>({time.length ? time : feed.remainTime()})</>;
};

export default Time;

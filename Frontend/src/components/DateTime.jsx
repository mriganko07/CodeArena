import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="text-gray-300 text-sm font-bold mb-2 flex items-center gap-2">
      <span>{formattedDate}</span>
      <span>{formattedTime}</span>
    </div>
  );
};

export default DateTime;

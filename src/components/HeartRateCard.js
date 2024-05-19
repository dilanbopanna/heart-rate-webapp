import { useEffect, useState } from "react";

function formatTimestamp(timestamp) {
  const dateObj = new Date(timestamp);

  const hours = dateObj.getHours();
  const minutes = `0${dateObj.getMinutes()}`.slice(-2);
  const seconds = `0${dateObj.getSeconds()}`.slice(-2);
  const milliSeconds = `0${dateObj.getMilliseconds()}`.slice(-3);

  const amOrPm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;

  const formattedTime = `${hours12}:${minutes}:${seconds}:${milliSeconds} ${amOrPm}`;

  return formattedTime;
}

const thresholds = {
  OK: 11,
  WARN: 15,
  BOO: 19,
};

const HeartRateCard = ({ participant, heartRate, timestamp }) => {
  const [crossedOK, setCrossedOK] = useState(false);
  const [crossedWarn, setCrossedWarn] = useState(false);
  const [crossedBoo, setCrossedBoo] = useState(false);

  useEffect(() => {
    if (heartRate < thresholds.OK) {
      setCrossedOK(true);
    }
    if (heartRate < thresholds.WARN && heartRate > thresholds.OK) {
      setCrossedWarn(true);
    }
    if (heartRate > thresholds.WARN) {
      setCrossedBoo(true);
    }
  }, [heartRate]);

  let statusText;
  if (heartRate < thresholds.OK) {
    statusText = "OK";
  } else if (heartRate < thresholds.WARN && heartRate > thresholds.OK) {
    statusText = "Warn";
  } else if (heartRate > thresholds.WARN) {
    statusText = "Boo!";
  } else {
    statusText = "OK";
  }
  let colorClass =
    statusText === "OK"
      ? "text-green-500 border-green-500"
      : statusText === "Warn"
      ? "text-orange-400 border-orange-400"
      : "text-red-600 border-red-600";
  return (
    <div class="max-w-sm p-6 px-10 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-2xl">
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Participant: {participant}
      </h5>
      <p class="mb-3 text-red-400 dark:text-gray-400 self-center justify-center items-center flex font-extrabold text-7xl">
        {heartRate}
      </p>
      <p className="text-sm font-medium text-gray-600 italic">
        Last Updated at: {formatTimestamp(timestamp)}
      </p>
      <div
        className={`${colorClass} m-2 border-2  rounded-xl text-5xl font-bold h-36 flex justify-center items-center`}
      >
        {statusText}
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="flex flex-row gap-1 justify-center items-center">
          <div
            className={`h-3 w-3 rounded-full border border-gray-400 ${
              crossedOK ? "bg-green-400" : ""
            }`}
          ></div>
          <div className="flex flex-row">OK</div>
        </div>
        <div className="flex flex-row gap-1 justify-center items-center">
          <div
            className={`h-3 w-3 rounded-full border border-gray-400 ${
              crossedWarn ? "bg-orange-400" : ""
            }`}
          ></div>
          <div className="flex flex-row">Warn</div>
        </div>
        <div className="flex flex-row gap-1 justify-center items-center">
          <div
            className={`h-3 w-3 rounded-full border border-gray-400 ${
              crossedBoo ? "bg-red-600" : ""
            }`}
          ></div>
          <div className="flex flex-row">Boo</div>
        </div>
      </div>
    </div>
  );
};

export default HeartRateCard;

import React, { useState, useEffect } from "react";
import HeartRateCard from "./HeartRateCard";

const HeartRateComponent = () => {
  const [heartRates, setHeartRates] = useState({});

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3000/latestHeartRate")
        .then((response) => response.json())
        .then((data) => {
          setHeartRates(data);
        })
        .catch((error) => {
          console.error("Error fetching heart rate:", error);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row flex-wrap m-10 gap-20">
      {Object.keys(heartRates).length > 0 ? (
        Object.keys(heartRates).map((participant, index) => (
          <HeartRateCard
            key={index}
            participant={participant}
            heartRate={heartRates[participant].heartRate}
            timestamp={heartRates[participant].timestamp}
          />
        ))
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default HeartRateComponent;

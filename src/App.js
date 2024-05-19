import "./App.css";
import { useState, useEffect } from "react";
import HeartRateComponent from "./components/HeartRateComponent";

function App() {
  const [localIpAddress, setLocalIpAddress] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/getIP")
      .then((response) => response.json())
      .then((data) => setLocalIpAddress(data.localIpAddress))
      .catch((error) =>
        console.error("Error fetching local IP address:", error)
      );
  }, []);

  return (
    <div className="App">
      {localIpAddress ? (
        <p>Your local IP Address is: {localIpAddress}</p>
      ) : (
        <p>Loading...</p>
      )}
      <HeartRateComponent />
    </div>
  );
}

export default App;

const express = require("express");
const os = require("os");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === "IPv4" && !config.internal) {
        return config.address;
      }
    }
  }
  return "127.0.0.1";
}

app.get("/getIP", (req, res) => {
  const localIpAddress = getLocalIpAddress();
  res.json({ localIpAddress: `${localIpAddress}:${port}` });
});

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

let latestHeartRates = {};

// POST API to save heart rate data
app.post("/heartRate", (req, res) => {
  const { participantId, heartRate, timestamp } = req.body;
  if (!participantId) {
    return res
      .status(400)
      .json({ error: "Missing participantId, heartRate, or timestamp" });
  }
  latestHeartRates[participantId] = { heartRate, timestamp };
  res.status(200).json({ message: "Heart rate data saved successfully" });
});

// API to get heart rate data
app.get("/latestHeartRate", (req, res) => {
  res.status(200).json(latestHeartRates);
});

app.listen(port, "0.0.0.0", () => {
  const localIpAddress = getLocalIpAddress();
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Server is running at http://${localIpAddress}:${port}`);
});

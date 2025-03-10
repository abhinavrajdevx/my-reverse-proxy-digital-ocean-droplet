import express from "express";
import httpProxy from "http-proxy";
import cors from "cors";
import { config } from "dotenv";
import http from "http";

config();

const SERVER_IP = process.env.SERVER_IP;
const PORT = process.env.PORT || 3000; // Default port as fallback

// Validate required environment variables
if (!PORT) {
  console.warn(
    "Warning: PORT environment variable not set, using default 3000"
  );
}

const app = express();
const apiProxy = httpProxy.createProxyServer();
const backend = {
  "imagine-aix": "http://127.0.0.1:3001",
};

app.use(cors());

// Match all routes under /imagine-aix
app.all("/imagine-aix/*", function (req: any, res: any) {
  try {
    console.log("Control reached...");
    apiProxy.web(req, res, { target: backend["imagine-aix"] });
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).send("Proxy error occurred");
  }
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`App running on ${PORT}`));

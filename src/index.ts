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

app.use(cors());

app.get("/test", (req: any, res: any) => {
  res.json({
    message: "OK",
  });
});

// Match all routes under /imagine-aix
app.all("/imagine-aix/*", function (req: any, res: any) {
  try {
    console.log("Control reached...");
    apiProxy.web(req, res, { target: "http://localhost:3001" });
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).send("Proxy error occurred");
  }
});

app.all("/ai-web-scrapper/*", function (req: any, res: any) {
  try {
    console.log("Control reached...");
    apiProxy.web(req, res, { target: "http://localhost:3002" });
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).send("Proxy error occurred");
  }
});

app.all("/user-dashboard/*", function (req: any, res: any) {
  try {
    console.log("Control reached...");
    apiProxy.web(req, res, { target: "http://localhost:3003" });
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).send("Proxy error occurred");
  }
});

app.all("/veridian/*", function (req: any, res: any) {
  try {
    console.log("Control reached...");
    apiProxy.web(req, res, { target: "http://localhost:3004" });
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).send("Proxy error occurred");
  }
});

const server = http.createServer(app);

server.listen(PORT, () => console.log(`App running on ${PORT}`));

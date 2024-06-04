import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";

import { router } from "./routes";

import "./db";

const app = express();
app.use(helmet({ crossOriginResourcePolicy: false }));

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  res.on("finish", () => {
    console.log(
      `${req.method} ${req.path} ${res.statusCode} ${res.statusMessage}; ${res.get("Content-Length") || 0}b sent`,
    );
  });
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

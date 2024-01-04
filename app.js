import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

import Api from "./src/routes/index.js";
app.use("/api", Api);

app.listen(process.env.PORT, () => {
  console.log(`server on at ${process.env.HOST}:${process.env.PORT}`);
});

//flow api=>v1=>user

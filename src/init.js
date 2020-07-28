import "@babel/polyfill";
import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

function handleListening() {
  console.log(`Listening on : http://localhost:${PORT}`);
}

app.listen(4000, handleListening);

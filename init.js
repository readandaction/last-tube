import "./db";
import app from "./app";
import dotenv from "dotenv";
import "./models/Video";

dotenv.config();

const PORT = process.env.PORT || 4000;

function handleListening() {
  console.log(`Listening on : http://localhost:${PORT}`);
}

app.listen(4000, handleListening);

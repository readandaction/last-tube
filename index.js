import express from "express";
const app = express();

const PORT = 4000;

function handleListening() {
  console.log(`Listening on : "http://localhost:${PORT}`);
}
const handleHome = (req, res) => res.send("hom");

app.get("/", handleHome);
app.listen(4000, handleListening);

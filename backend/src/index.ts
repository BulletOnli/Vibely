import "dotenv-safe/config";
import express from "express";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server listening to port " + port);
  console.log("Server: http://localhost:" + port);
});

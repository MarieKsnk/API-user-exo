import express from "express";
import usersRouter from "./routes/usersRouter.js";
import "dotenv/config";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", usersRouter);

app.get("/", (req, res) => {
  return res.end("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import categoriesRouter from "./routes/categories.js";
import gamesRouter from "./routes/games.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRouter);
app.use(gamesRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import categoriesRouter from "./routes/categories.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoriesRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

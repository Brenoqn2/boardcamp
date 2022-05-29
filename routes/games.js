import { Router } from "express";
import { getGames } from "../controllers/games.js";
// import validateGame from "../middlewares/games.js";

const gamesRouter = Router();
gamesRouter.get("/games", getGames);
// gamesRouter.post("/games");

export default gamesRouter;

import { Router } from "express";
import { getGames, insertGame } from "../controllers/games.js";
import validateGame from "../middlewares/games.js";

const gamesRouter = Router();
gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateGame, insertGame);

export default gamesRouter;

import { Router } from "express";
import { getRentals, addRental } from "../controllers/rentals.js";
import validateRental from "../middlewares/rentals.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, addRental);

export default rentalsRouter;

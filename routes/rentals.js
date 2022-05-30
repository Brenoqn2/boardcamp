import { Router } from "express";
import { getRentals, addRental, finishRental } from "../controllers/rentals.js";
import {
  validateRental,
  validateRentalFinish,
} from "../middlewares/rentals.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, addRental);
rentalsRouter.post("/rentals/:id/return", finishRental);

export default rentalsRouter;

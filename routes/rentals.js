import { Router } from "express";
import {
  getRentals,
  addRental,
  finishRental,
  deleteRental,
} from "../controllers/rentals.js";
import {
  validateRental,
  validateRentalFinish,
} from "../middlewares/rentals.js";

const rentalsRouter = Router();
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateRental, addRental);
rentalsRouter.post("/rentals/:id/return", validateRentalFinish, finishRental);
rentalsRouter.delete("/rentals/:id", validateRentalFinish, deleteRental);

export default rentalsRouter;

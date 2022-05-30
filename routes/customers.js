import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  addCustomer,
} from "../controllers/customers.js";
import { validateCustomer } from "../middlewares/customers.js";

const customersRouter = Router();
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers", validateCustomer, addCustomer);

export default customersRouter;

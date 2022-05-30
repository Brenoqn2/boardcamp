import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
} from "../controllers/customers.js";
import { validateCustomer } from "../middlewares/customers.js";

const customersRouter = Router();
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers", validateCustomer, addCustomer);
customersRouter.put("/customers/:id", validateCustomer, updateCustomer);

export default customersRouter;

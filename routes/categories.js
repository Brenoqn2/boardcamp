import { Router } from "express";
import { getCategories } from "../controllers/categories.js";

const categoriesRouter = Router();
categoriesRouter.get("/categories", getCategories);

export default categoriesRouter;

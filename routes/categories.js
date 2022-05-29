import { Router } from "express";
import { getCategories, insertCategory } from "../controllers/categories.js";
import validateCategory from "../middlewares/categories.js";

const categoriesRouter = Router();
categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", validateCategory, insertCategory);

export default categoriesRouter;

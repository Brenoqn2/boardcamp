import { categorySchema } from "../schemas/categories.js";
import validateSchema from "../schemas/validateSchema.js";
import db from "../database.js";

export default async function validateCategory(req, res, next) {
  if (!validateSchema(req.body, categorySchema)) return res.sendStatus(400);
  const result = await db.query(`SELECT * FROM categories`);
  const categories = result.rows;
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].name === req.body.name) return res.sendStatus(409);
  }

  next();
}

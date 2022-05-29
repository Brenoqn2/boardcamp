import { gameSchema } from "../schemas/games.js";
import validateSchema from "../schemas/validateSchema.js";
import db from "../database.js";

export default async function validateGame(req, res, next) {
  if (
    !validateSchema(req.body, gameSchema) ||
    req.body.stockTotal <= 0 ||
    req.body.pricePerDay <= 0
  )
    return res.sendStatus(400);
  const game = await db.query(`SELECT * FROM games WHERE name = $1`, [
    req.body.name,
  ]);
  const gameAlreadyExists = game.rows;
  const category = await db.query(`SELECT * FROM categories WHERE id = $1`, [
    req.body.categoryId,
  ]);
  const categoryExists = category.rows;

  if (gameAlreadyExists.length > 0 || categoryExists.length === 0)
    return res.sendStatus(409);

  next();
}

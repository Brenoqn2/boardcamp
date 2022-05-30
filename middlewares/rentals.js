import db from "../database.js";
import validateSchema from "../schemas/validateSchema.js";
import { rentalSchema } from "../schemas/rentals.js";

export async function validateRental(req, res, next) {
  if (!validateSchema(req.body, rentalSchema) || req.body.daysRented <= 0)
    return res.sendStatus(400);
  const customerResult = await db.query(
    `SELECT * FROM customers WHERE id = $1`,
    [req.body.customerId]
  );
  const customer = customerResult.rows;
  if (customer.length === 0) return res.sendStatus(400);

  const gameResult = await db.query(`SELECT * FROM games WHERE id = $1`, [
    req.body.gameId,
  ]);
  const game = gameResult.rows;
  if (game.length === 0) return res.sendStatus(400);

  let rentalsForThisGame = await db.query(
    `SELECT * FROM rentals WHERE "gameId" = $1`,
    [req.body.gameId]
  );
  rentalsForThisGame = rentalsForThisGame.rows;
  if (rentalsForThisGame.length >= game[0].stockTotal)
    return res.sendStatus(400);

  next();
}

export async function validateRentalFinish(req, res, next) {
  const id = req.params.id;
  let rental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
  rental = rental.rows;
  console.log(rental);
  if (rental.length === 0) return res.sendStatus(404);
  if (rental[0].returnDate !== null) return res.sendStatus(400);

  next();
}

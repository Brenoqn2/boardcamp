import db from "../database.js";
import moment from "moment";
export async function getRentals(req, res) {
  try {
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;
    let result;
    if (customerId) {
      result = await db.query(
        `SELECT * FROM rentals WHERE 'customerId' LIKE $1`,
        [`${customerId}%`]
      );
      result = result.rows;
    } else if (gameId) {
      result = await db.query(
        `SELECT * FROM rentals WHERE 'customerId' LIKE $1`,
        [`${customerId}%`]
      );
      result = result.rows;
    } else {
      result = await db.query(`SELECT * FROM rentals`);
      result = result.rows;
    }
    let responseArr = [];
    result.forEach(async (rental) => {
      let customerInfo = await db.query(
        `SELECT * FROM customers WHERE id = ${rental.customerId}`
      );
      customerInfo = customerInfo.rows;
      let gameInfo = await db.query(
        `SELECT * FROM games WHERE id = ${rental.gameId}`
      );
      gameInfo = gameInfo.rows;
      responseArr.push({
        ...rental,
        customer: { ...customerInfo[0] },
        game: { ...gameInfo[0] },
      });
    });
    res.send(responseArr);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function addRental(req, res) {
  try {
    const { customerId, gameId, daysRented } = req.body;
    let rentDate = moment();
    rentDate = rentDate.format("YYYY-MM-DD");
    let gameInfo = await db.query(`SELECT * FROM games WHERE id = ${gameId}`);
    gameInfo = gameInfo.rows;
    const gamePrice = gameInfo[0].pricePerDay;
    const originalPrice = daysRented * gamePrice;
    await db.query(
      `
    INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3,$4,$5,$6,$7)
    `,
      [customerId, gameId, daysRented, rentDate, null, originalPrice, null]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

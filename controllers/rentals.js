import db from "../database.js";
import moment from "moment";
export async function getRentals(req, res) {
  try {
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;
    let result;
    if (customerId) {
      result = await db.query(`SELECT * FROM rentals WHERE "customerId" = $1`, [
        `${customerId * 1}`,
      ]);
      result = result.rows;
    } else if (gameId) {
      result = await db.query(`SELECT * FROM rentals WHERE 'gameId' = $1`, [
        `${gameId * 1}`,
      ]);
      result = result.rows;
    } else {
      result = await db.query(`SELECT * FROM rentals`);
      result = result.rows;
    }
    let array = [];
    for (let i = 0; i < result.length; i++) {
      let customerInfo = await db.query(
        `SELECT * FROM customers WHERE id = ${result[i].customerId}`
      );
      customerInfo = customerInfo.rows;
      let gameInfo = await db.query(
        `SELECT * FROM games WHERE id = ${result[i].gameId}`
      );
      gameInfo = gameInfo.rows;

      let categoryInfo = await db.query(
        `SELECT * FROM categories WHERE id = ${gameInfo[0].categoryId}`
      );
      categoryInfo = categoryInfo.rows;
      const rentalObject = {
        ...result[i],
        customer: { id: customerInfo[0].id, name: customerInfo[0].name },
        game: {
          id: gameInfo[0].id,
          name: gameInfo[0].name,
          categoryId: gameInfo[0].categoryId,
          categoryName: categoryInfo[0].name,
        },
      };
      array.push(rentalObject);
    }
    res.send(array);
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

export async function finishRental(req, res) {
  try {
    const id = req.params.id;
    let returnDate = moment();
    returnDate = returnDate.format("YYYY-MM-DD");
    let rental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
    rental = rental.rows[0];
    let rentDate = rental.rentDate;
    rentDate = moment(rentDate);
    rentDate = rentDate.format("YYYY-MM-DD");
    const pricePerDay = rental.originalPrice / rental.daysRented;
    const dateOne = moment(returnDate.split("-"));
    const dateTwo = moment(rentDate.split("-"));

    const delayedDays = dateOne.diff(dateTwo, "days");
    const delayFee = pricePerDay * delayedDays;
    await db.query(
      `
        UPDATE rentals 
        SET "returnDate" = $1, "delayFee" = $2
        WHERE id = $3`,
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  try {
    const id = req.params.id;
    await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

import db from "../database.js";
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

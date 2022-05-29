import db from "../database.js";
export async function getGames(req, res) {
  try {
    const nameQuery = req.query.name;
    if (nameQuery) {
      const result = await db.query(
        `SELECT * FROM games WHERE lower(name) LIKE $1`,
        [`${nameQuery.toLowerCase()}%`]
      );
      return res.send(result.rows);
    }
    const result = await db.query("SELECT * FROM games");
    res.send(result.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function insertGame(req, res) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    await db.query(
      `
        INSERT INTO games ("name","image","stockTotal","categoryId","pricePerDay")
        VALUES ($1,$2,$3,$4,$5)
        `,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

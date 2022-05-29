import db from "../database.js";
export async function getGames(req, res) {
  const nameQuery = req.query.name;
  if (nameQuery) {
    const result = await db.query(
      `SELECT * FROM games WHERE name LIKE $1 COLLATE utf8_general_ci`,
      [`${nameQuery}%`]
    );
    return res.send(result.rows);
  }
  const result = await db.query("SELECT * FROM games");
  res.send(result.rows);
}

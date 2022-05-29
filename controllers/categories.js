import db from "../database.js";
export async function getCategories(req, res) {
  const result = await db.query("SELECT * FROM categories");
  res.send(result.rows);
}

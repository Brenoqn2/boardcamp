import db from "../database.js";
export async function getCategories(req, res) {
  const result = await db.query("SELECT * FROM categories");
  res.send(result.rows);
}

export async function insertCategory(req, res) {
  await db.query(
    `
    INSERT INTO categories (name)
    VALUES ($1)
    `,
    [req.body.name]
  );
  res.sendStatus(201);
}

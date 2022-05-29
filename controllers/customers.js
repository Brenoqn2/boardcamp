import db from "../database.js";
export async function getCustomers(req, res) {
  try {
    const cpfQuery = req.query.cpf;
    if (cpfQuery) {
      const result = await db.query(
        `SELECT * FROM customers WHERE cpf LIKE $1 `,
        [`${cpfQuery}%`]
      );
      return res.send(result.rows);
    }
    const result = await db.query("SELECT * FROM customers");
    res.send(result.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getCustomer(req, res) {
  const id = req.params.id;
  const result = await db.query("SELECT * FROM customers WHERE id = $1", [id]);
  if (result.rows.length === 0) res.sendStatus(404);
  res.send(result.rows[0]);
}

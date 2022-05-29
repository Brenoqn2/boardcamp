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

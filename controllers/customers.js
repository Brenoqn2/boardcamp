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

export async function addCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  await db.query(
    `
  INSERT INTO customers (name, phone, cpf,birthday)
  VALUES ($1,$2,$3,$4)
  `,
    [name, phone, cpf, birthday]
  );
  res.sendStatus(201);
}

export async function updateCustomer(req, res) {
  const id = req.params.id;
  const { name, phone, cpf, birthday } = req.body;
  await db.query(
    `
    UPDATE customers 
    SET name = $1, phone = $2, birthday = $3, cpf = $4
    WHERE id = $5
  `,
    [name, phone, birthday, cpf, id]
  );
  res.sendStatus(200);
}

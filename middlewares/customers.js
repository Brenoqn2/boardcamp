import { customerSchema } from "../schemas/customers.js";
import validateSchema from "../schemas/validateSchema.js";
import db from "../database.js";
import dayjs from "dayjs";

export async function validateCustomer(req, res, next) {
  console.log(dayjs(req.body.birthday, "YYYY-MM-DD", true).isValid());
  if (
    !validateSchema(req.body, customerSchema) ||
    !dayjs(req.body.birthday, "YYYY-MM-DD", true).isValid()
  )
    return res.sendStatus(400);

  const result = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [
    req.body.cpf,
  ]);

  const alreadyExists = result.rows;

  if (alreadyExists.length > 0) return res.sendStatus(409);

  next();
}

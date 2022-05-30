import { customerSchema } from "../schemas/customers.js";
import validateSchema from "../schemas/validateSchema.js";
import db from "../database.js";
import moment from "moment";

export async function validateCustomer(req, res, next) {
  const id = req.params.id;
  const m = moment(req.body.birthday, "YYYY-MM-DD");
  if (!validateSchema(req.body, customerSchema) || !m.isValid())
    return res.sendStatus(400);
  if (Number(req.body.birthday.split("-")[0]) < 1900)
    return res.sendStatus(400);
  const result = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [
    req.body.cpf,
  ]);

  const alreadyExists = result.rows;

  if (alreadyExists.length > 0 && alreadyExists[0].id !== id * 1)
    return res.sendStatus(409);

  next();
}

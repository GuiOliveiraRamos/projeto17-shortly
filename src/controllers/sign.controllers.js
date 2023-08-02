import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const userExistsQuery = "SELECT id FROM usuarios WHERE email = $1";
    const userExistsValues = [email];
    const userExistsResult = await db.query(userExistsQuery, userExistsValues);

    if (userExistsResult.rowCount > 0) return res.sendStatus(409);

    const hash = bcrypt.hashSync(password, 10);

    const insertUserQuery =
      "INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3)";
    const insertUserValues = [name, email, hash];
    await db.query(insertUserQuery, insertUserValues);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const userQuery = "SELECT id, password FROM usuarios WHERE email = $1";
    const userValues = [email];
    const userResult = await db.query(userQuery, userValues);

    console.log(userResult.rows);

    if (userResult.rowCount === 0) return res.sendStatus(401);

    const user = userResult.rows[0];

    const validatePassword = bcrypt.compareSync(password, user.password);

    console.log("Password match:", validatePassword);

    if (!validatePassword) return res.sendStatus(401);

    const userToken = uuidv4();

    res.status(200).json({ token: userToken });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

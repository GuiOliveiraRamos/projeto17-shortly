import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function newUrl(req, res) {
  const { url } = req.body;

  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.sendStatus(401);

    const shortUrl = nanoid(8);

    const insertUrlQuery =
      "INSERT INTO urls (url, shortUrl) VALUES ($1, $2) RETURNING id";
    const insertUrlValues = [url, shortUrl];
    const insertUrlResult = await db.query(insertUrlQuery, insertUrlValues);

    const id = insertUrlResult.rows[0].id;

    res.status(201).json({ id, shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const query = "SELECT id,url,shorturl FROM urls WHERE id = $1";
    const values = [id];
    const result = await db.query(query, values);

    if (result.rows.length === 0) return res.sendStatus(404);

    const urlData = result.rows[0];
    const { shortUrl, url } = urlData;
    res.status(200).json({ id, url, shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

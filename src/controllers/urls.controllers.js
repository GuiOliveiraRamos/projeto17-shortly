import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function newUrl(req, res) {
  const { url } = req.body;

  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.sendStatus(401);

    const short_url = nanoid(8);

    const insertUrlQuery =
      "INSERT INTO urls (url, short_url) VALUES ($1, $2) RETURNING id";
    const insertUrlValues = [url, short_url];
    const insertUrlResult = await db.query(insertUrlQuery, insertUrlValues);

    const id = insertUrlResult.rows[0].id;

    res.status(201).json({ id, short_url });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const query = "SELECT id,url,short_url FROM urls WHERE id = $1";
    const values = [id];
    const result = await db.query(query, values);

    if (result.rows.length === 0) return res.sendStatus(404);

    const urlData = result.rows[0];
    const { short_url, url } = urlData;
    res.status(200).json({ id, url, short_url });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getShortUrl(req, res) {
  const { short_url } = req.params;

  try {
    console.log("getShortUrl: Start");
    console.log("getShortUrl: Short URL:", short_url);
    const query = "SELECT url FROM urls WHERE short_url = $1";
    const values = [short_url];
    const result = await db.query(query, values);
    console.log("getShortUrl: Database Query Result:", result.rows);

    if (result.rows.length === 0) {
      console.log("getShortUrl: Short URL not found in database");
      return res.sendStatus(404);
    }
    const url = result.rows[0].url;
    console.log("getShortUrl: Original URL:", url);

    const updateViewsQuery =
      "UPDATE urls SET views = views + 1 WHERE short_url = $1";
    await db.query(updateViewsQuery, [short_url]);
    console.log("getShortUrl: Redirecting to URL:", url);

    res.redirect(url);
  } catch (err) {
    console.error("getShortUrl: Error:", err.message);

    res.status(500).send(err.message);
  }
}

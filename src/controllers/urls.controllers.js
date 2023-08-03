import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function newUrl(req, res) {
  const { url } = req.body;

  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.sendStatus(401);

    const userQuery = "SELECT id FROM usuarios WHERE uuid = $1";
    const userValues = [authorization];
    const userResult = await db.query(userQuery, userValues);

    if (userResult.rowCount === 0) return res.sendStatus(401);

    const shortUrl = nanoid(8);

    const insertUrlQuery =
      'INSERT INTO urls (url, "shortUrl") VALUES ($1, $2) RETURNING id';
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
    const query = 'SELECT id, url, "shortUrl" FROM urls WHERE id = $1';
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

export async function getShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    console.log("getShortUrl: Start");
    console.log("getShortUrl: Short URL:", shortUrl);
    const query = 'SELECT url FROM urls WHERE "shortUrl" = $1';
    const values = [shortUrl];
    const result = await db.query(query, values);
    console.log("getShortUrl: Database Query Result:", result.rows);

    if (result.rows.length === 0) {
      console.log("getShortUrl: Short URL not found in database");
      return res.sendStatus(404);
    }
    const url = result.rows[0].url;
    console.log("getShortUrl: Original URL:", url);

    const updateViewsQuery =
      'UPDATE urls SET views = views + 1 WHERE "shortUrl" = $1';
    await db.query(updateViewsQuery, [shortUrl]);
    console.log("getShortUrl: Redirecting to URL:", url);

    res.redirect(url);
  } catch (err) {
    console.error("getShortUrl: Error:", err.message);

    res.status(500).send(err.message);
  }
}

export async function deleteShortUrl(req, res) {
  const { id } = req.params;
  const authorization = req.headers.authorization;

  try {
    if (!authorization) return res.sendStatus(401);
    console.log("Authorization:", authorization);

    const userQuery = "SELECT id FROM usuarios WHERE uuid = $1";
    const userValues = [authorization];
    const userResult = await db.query(userQuery, userValues);

    if (userResult.rowCount === 0) return res.sendStatus(401);

    const userId = userResult.rows[0].id;

    console.log("UserId:", userId);

    const urlQuery = 'SELECT id FROM urls WHERE "id" = $1 ';
    const urlValues = [id];
    const urlResult = await db.query(urlQuery, urlValues);

    if (urlResult.rowCount === 0) {
      console.log("URL Query Result:", urlResult.rows);
      return res.sendStatus(404);
    }

    const deleteUrlQuery = 'DELETE FROM urls WHERE "id" = $1';
    await db.query(deleteUrlQuery, [id]);

    res.sendStatus(204);
  } catch (err) {
    console.error("Error:", err);

    res.status(500).send(err.message);
  }
}

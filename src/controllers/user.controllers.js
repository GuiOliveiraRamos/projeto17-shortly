import { db } from "../database/database.connection.js";
export async function getUsers(req, res) {
  const authorization = req.headers.authorization;

  try {
    if (!authorization) return res.sendStatus(401);
    console.log("Authorization:", authorization);

    const token = authorization.replace("Bearer ", "");

    const userQuery = "SELECT id, name FROM usuarios WHERE uuid = $1";
    const userValues = [token];
    const userResult = await db.query(userQuery, userValues);

    if (userResult.rowCount === 0) return res.sendStatus(401);

    const userId = userResult.rows[0].id;
    const userName = userResult.rows[0].name;

    const visitCountQuery =
      "SELECT SUM(views) AS total FROM urls WHERE user_id = $1";
    const visitCountValues = [userId];
    const visitCountResult = await db.query(visitCountQuery, visitCountValues);

    const visitCount = visitCountResult.rows[0].total || 0;

    const urlsQuery =
      'SELECT id, url, "shortUrl", views FROM urls WHERE user_id = $1';
    const urlsValues = [userId];
    const urlsResult = await db.query(urlsQuery, urlsValues);

    const shortenedUrls = urlsResult.rows.map((url) => ({
      id: url.id,
      shortUrl: url.shortUrl,
      url: url.url,
      visitCount: url.views,
    }));

    const userData = {
      id: userId,
      name: userName,
      visitCount,
      shortenedUrls,
    };

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

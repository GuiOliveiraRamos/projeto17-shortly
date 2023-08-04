import { db } from "../database/database.connection.js";

export async function getRanking(req, res) {
  try {
    const rankingQuery = `
        SELECT
          u.id AS id,
          u.name AS name,
          COUNT(url.id) AS linksCount,
          COALESCE(SUM(url.views), 0) AS visitCount
        FROM usuarios u
        LEFT JOIN urls url ON u.id = url.user_id
        GROUP BY u.id, u.name
        ORDER BY visitCount DESC
        LIMIT 10;
      `;

    const rankingResult = await db.query(rankingQuery);
    const rankingData = rankingResult.rows;

    res.status(200).json(rankingData);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

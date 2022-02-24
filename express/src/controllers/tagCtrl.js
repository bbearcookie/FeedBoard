const db = require('../config/database');

/** @type {import("express").RequestHandler} */
module.exports.getTrendTags = async (req, res) => {

  const con = await db.getConnection();
  try {
    let sql =
    `SELECT value, COUNT(*) AS count FROM tag
    WHERE taggedTime BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK) AND NOW()
    GROUP BY value
    ORDER BY count DESC, taggedTime DESC`;
    let [tags] = await con.query(sql);
    tags = tags.slice(0, 9); // 일주일간 많이 사용된 태그 10개까지만 추출

    return res.status(200).json({ message: '트렌드 태그 반환', tags });
  } catch (err) {
    return res.status(err.statusCode).json({ message: err.message, field: err.field });
  } finally {
    con.release();
  }
}
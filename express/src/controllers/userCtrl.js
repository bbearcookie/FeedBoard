const db = require('../config/database');

/** @type {import("express").RequestHandler} */
module.exports.getUser = async (req, res) => {
  const { username } = req.params;
  const con = await db.getConnection();

  try {
    let sql =
    `SELECT username, nickname, introduce, imgFileName, registeredTime
    FROM user
    WHERE username = ?`;
    let [[user]] = await con.query(sql, username);
    res.status(200).json({ message: '사용자 조회 성공', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
}
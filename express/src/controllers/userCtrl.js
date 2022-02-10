const db = require('../config/database');

/** @type {import("express").RequestHandler} */
module.exports.getNickname = async (req, res) => {
  const { username } = req.params;
  const con = await db.getConnection();

  try {
    let sql = "SELECT nickname FROM user WHERE username = ?";
    let [[{nickname}]] = await con.query(sql, username);
    res.status(200).json({ message: '닉네임 조회 성공', nickname });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
}
const db = require('../config/database');

/** @type {import("express").RequestHandler} */
module.exports.writePost = async (req, res) => {
  const { title, content } = req.body;

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: '로그인 상태가 아니에요.' });
  }

  const con = await db.getConnection();
  try {
    const sql = 'INSERT INTO post (title, content, author) VALUES (?, ?, ?)';
    await con.execute(sql, [title, content, req.user.username]);
    res.status(200).json({ message: '게시글을 작성했어요!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
}
const db = require('../config/database');
const { post } = require('./testCtrl');

/** @type {import("express").RequestHandler} */
module.exports.writePost = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: '로그인 상태가 아니에요.' });
  }

  const con = await db.getConnection();
  try {

    // 게시글 추가
    let sql = 'INSERT INTO post (title, content, author) VALUES (?, ?, ?)';
    const [{insertId: postNo}] = await con.execute(sql, [title, content, req.user.username]);

    // 태그 추가
    sql = 'INSERT INTO tag (postNo, value) VALUES (?, ?)';
    for (tag of tags) {
      con.execute(sql, [postNo, tag]);
    }

    res.status(200).json({ message: '게시글을 작성했어요!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
}

/** @type {import("express").RequestHandler} */
module.exports.getPosts = async (req, res) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT no, title, content, author, nickname, writtenTime
    FROM POST P, USER U
    WHERE P.AUTHOR = U.USERNAME`;
    const [posts] = await con.query(sql);
    const postNums = posts.map(post => post.no);
    sql = 'SELECT * FROM TAG WHERE postNo IN (?)';
    const [tags] = await con.query(sql, [postNums]);

    let newArr = [];
    for (i in posts) {
      let newObj = posts[i];

      newObj.tags = tags.filter(tag => tag.postNo === posts[i].no);
      newArr.push(newObj);
    }

    res.status(200).json({ message: '게시글 조회 성공', posts: newArr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
}
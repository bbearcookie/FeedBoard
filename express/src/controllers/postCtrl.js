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
    await con.beginTransaction(); // 게시글과 태그 생성과정 트랜잭션으로 묶어서 통째로 처리.

    // 게시글 추가
    let sql = 'INSERT INTO post (title, content, author) VALUES (?, ?, ?)';
    const [{insertId: postNo}] = await con.execute(sql, [title, content, req.user.username]);

    // 태그 추가
    sql = 'INSERT INTO tag (postNo, value, sequence) VALUES (?, ?, ?)';
    for (i in tags) {
      await con.execute(sql, [postNo, tags[i], i]);
    }

    con.commit();
    res.status(200).json({ message: '게시글을 작성했어요!' });
  } catch (err) {
    console.error(err);
    con.rollback();
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
    sql = 'SELECT * FROM TAG WHERE postNo IN (?) ORDER BY sequence';
    const [tags] = await con.query(sql, [postNums]);

    // post 객체에 tag 정보를 포함시킨 형태의 배열 생성
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
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
  const { author, tag, favorite } = req.query;
  console.log(req.query);

  const con = await db.getConnection();

  try {
    let sql;
    let posts;

    if (author) {

      // 특정 사용자가 좋아하는 게시글 조회
      if (favorite) {
  
      // 특정 사용자가 작성한 게시글 조회
      } else {
        sql = `
        SELECT no, title, content, author, nickname, writtenTime
        FROM POST P, USER U
        WHERE P.AUTHOR = U.USERNAME AND P.AUTHOR = ?`;
        [posts] = await con.query(sql, author);
      }

    } else {

      // 특정 태그의 게시글 조회
      if (tag) {
        sql = `
        SELECT postNo
        FROM tag
        WHERE value LIKE '%${tag}%'`;
        let [postNums] = await con.query(sql);
        postNums = postNums.map(item => item.postNo);

        sql = `
        SELECT no, title, content, author, nickname, writtenTime
        FROM POST P, USER U
        WHERE P.AUTHOR = U.USERNAME AND P.NO IN (?)`;
        [posts] = await con.query(sql, [postNums]);
      // 모든 게시글 조회
      } else {
        sql = `
        SELECT no, title, content, author, nickname, writtenTime
        FROM POST P, USER U
        WHERE P.AUTHOR = U.USERNAME`;
        [posts] = await con.query(sql);
      }
    }

    // 조회하려는 게시글에 포함된 태그들 가져옴
    let postNums = posts.map(post => post.no);
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
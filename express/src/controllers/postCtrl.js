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

  const con = await db.getConnection();

  try {
    let sql;
    let posts;

    if (author) {

      // 특정 사용자가 좋아하는 게시글 조회
      if (favorite) {

        sql = `SELECT postNo FROM favorite WHERE username='${author}'`;
        let [postNums] = await con.query(sql);
        postNums = postNums.map(item => item.postNo);

        if (postNums && postNums.length > 0) {
          sql = `
          SELECT no, title, content, author, nickname, writtenTime, imgFileName
          FROM POST P, USER U
          WHERE P.AUTHOR = U.USERNAME AND P.no IN (?)
          ORDER BY writtenTime DESC`;
          [posts] = await con.query(sql, [postNums]);
        }

      // 특정 사용자가 작성한 게시글 조회
      } else {
        sql = `
        SELECT no, title, content, author, nickname, writtenTime, imgFileName
        FROM POST P, USER U
        WHERE P.AUTHOR = U.USERNAME AND P.AUTHOR = ?
        ORDER BY writtenTime DESC`;
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
        if (postNums.length > 0) {
          sql = `
          SELECT no, title, content, author, nickname, writtenTime, imgFileName
          FROM POST P, USER U
          WHERE P.AUTHOR = U.USERNAME AND P.NO IN (?)
          ORDER BY writtenTime DESC`;
          [posts] = await con.query(sql, [postNums]);
        }
      // 모든 게시글 조회
      } else {
        sql = `
        SELECT no, title, content, author, nickname, writtenTime, imgFileName
        FROM POST P, USER U
        WHERE P.AUTHOR = U.USERNAME
        ORDER BY writtenTime DESC`;
        [posts] = await con.query(sql);
      }
    }

    if (posts && posts.length > 0) {

      // [조회하려는 게시글에 포함된 태그들 가져옴]
      let postNums = posts.map(post => post.no);
      sql = 'SELECT * FROM TAG WHERE postNo IN (?) ORDER BY sequence';
      const [tags] = await con.query(sql, [postNums]);
  
      // post 객체에 tag 정보를 추가
      posts = posts.map(post => {
        post.tags = tags.filter(tag => tag.postNo === post.no);

        return post;
      });

      // [좋아요 정보 가져옴]
      sql = 'SELECT * FROM favorite WHERE postNo IN (?) ORDER BY postNo';
      let [favorites] = await con.query(sql, [postNums]);

      // 게시글을 좋아하는 사용자의 username들을 포함한 배열을 post 객체에 추가
      posts = posts.map(post => {
        post.favoriteUsers = favorites.filter(favorite => favorite.postNo === post.no).map(item => item.username);

        return post;
      });

      // [댓글 수 가져옴]
      sql =
      `SELECT postNo, COUNT(*) AS commentCnt
      FROM comment
      WHERE postNo IN (?)
      GROUP BY postNo`
      const [commentCnt] = await con.query(sql, [postNums]);

      // 댓글 수를 post 객체에 추가
      posts = posts.map(post => {
        [post.commentCnt] = commentCnt.filter(item => item.postNo === post.no);

        if (post.commentCnt)
          post.commentCnt = post.commentCnt.commentCnt
        else
          post.commentCnt = 0;

        return post;
      });
  
      res.status(200).json({ message: '게시글 조회 성공', posts: posts });
    } else {
      res.status(200).json({ message: '조건에 맞는 게시글이 없음' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
}

/** @type {import("express").RequestHandler} */
module.exports.getPost = async (req, res) => {
  const { postNo } = req.params;

  const con = await db.getConnection();
  try {
    // 게시글 내용 조회
    let sql =
    `SELECT no, title, content, author, nickname, writtenTime, imgFileName
    FROM POST P, USER U
    WHERE P.author=U.username AND no = ?`;
    let [[post]] = await con.query(sql, postNo);

    if (!post) {
      return res.status(404).json({ message: "없는 게시글입니다." });
    }

    // 태그 조회
    sql = `SELECT * FROM TAG WHERE postNo = ? ORDER BY sequence`;
    let [tags] = await con.query(sql, postNo);
    post.tags = tags;

    // 댓글 조회
    sql =
    `SELECT no, content, author, postNo, writtenTime, nickname, imgFileName
    FROM COMMENT C, USER U
    WHERE postNo = ? AND C.author = U.username
    ORDER BY writtenTime DESC`;
    let [comments] = await con.query(sql, postNo);
    post.comments = comments;

    return res.status(200).json({ message: '게시글 조회 성공', post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
};

/** @type {import("express").RequestHandler} */
module.exports.patchFavorite = async (req, res) => {
  const { postNo } = req.params;

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: '로그인 상태가 아니에요.' });
  }

  const con = await db.getConnection();
  try {
    let sql = 'SELECT * FROM post WHERE no = ?';
    const [[post]] = await con.query(sql, postNo);

    if (!post) {
      return res.status(404).json({ message: '해당 게시글이 없음' });
    }

    sql =
    `SELECT *
    FROM favorite
    WHERE username='${req.user.username}' AND postNo=${postNo}`;
    const [[favorite]] = await con.query(sql);

    // 이미 좋아요 한 상태면 해제, 안된 상태면 추가
    let message = '';
    let handle;
    if (favorite) {
      sql = `DELETE FROM favorite WHERE username='${req.user.username}' AND postNo=${postNo}`;
      await con.execute(sql);
      handle = 'deleted';
      message = '게시글을 관심있는 글에서 제외했어요.';
    } else {
      sql = `INSERT INTO favorite (username, postNo) VALUES ('${req.user.username}', ${postNo})`;
      await con.execute(sql);
      handle = 'inserted';
      message = '게시글을 관심있는 글에 추가했어요.';
    }

    sql = 'SELECT * FROM favorite WHERE postNo = ? ORDER BY postNo';
    let [favorites] = await con.query(sql, postNo);
    favorites = favorites.filter(favorite => favorite.postNo === post.no).map(item => item.username);

    return res.status(200).json({ message, handle, favoriteUsers: favorites });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }
}

/** @type {import("express").RequestHandler} */
module.exports.writeComment = async (req, res) => {
  const { postNo, content } = req.body;

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: '로그인 상태가 아니에요.' });
  }

  const con = await db.getConnection();
  try {
    let sql = `INSERT INTO comment (content, author, postNo) VALUES ('${content}', '${req.user.username}', ${postNo})`;
    await con.execute(sql);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '데이터베이스 문제 발생' });
  } finally {
    con.release();
  }

  res.status(200).json({ message: '댓글 작성 처리' });
};
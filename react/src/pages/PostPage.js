import React, { useEffect, useState } from 'react';
import PostTitleBar from '../components/titlebar/PostTitleBar';
import PageTemplate from '../templates/PageTemplate';
import Tag from '../components/tag/Tag';
import CommentWriter from '../components/post/CommentWriter';
import Comment from '../components/post/Comment';
import { useParams } from 'react-router-dom';
import "./PostPage.scss";
import useRequest from '../lib/useRequest';
import * as api from '../lib/api';
import * as auth from '../lib/auth';

function dateFormat(date) {
  date = new Date(date);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

const PostPage = () => {
  const { postNo } = useParams();
  const [post, setPost] = useState({});
  const request = useRequest();

  const getPost = async () => {
    try {
      const data = await request.call(api.getPost, postNo);
      setPost(data.post);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <PageTemplate className="PostPage">
      <PostTitleBar
        title={post.title}
        nickname={post.nickname}
        writtenTime={dateFormat(post.writtenTime)}
      />
      <div className="inner-area">
        <p className="content">
          {post.content}
        </p>
        <div className="tag-area">
          {post.tags && post.tags.map(tag =>
            (<Tag key={tag.sequence} value={tag.value} />)
          )}
        </div>
        <hr className="divider" />
        <div className="comment-area">
          <h2 className="label">댓글 목록</h2>
          {auth.getUser() ? <CommentWriter nickname={auth.getNickname()} /> : null}
          {post.comments && post.comments.map(comment => 
            (<Comment
              key={comment.no}
              author={comment.author}
              nickname={comment.nickname}
              content={comment.content}
              writtenTime={dateFormat(comment.writtenTime)}
            />)
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default PostPage;
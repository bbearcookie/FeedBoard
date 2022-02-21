import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostTitleBar from '../components/titlebar/PostTitleBar';
import PageTemplate from '../templates/PageTemplate';
import Tag from '../components/tag/Tag';
import CommentWriter from '../components/post/CommentWriter';
import Comment from '../components/post/Comment';
import useRequest from '../lib/useRequest';
import * as api from '../lib/api';
import * as auth from '../lib/auth';
import { getFormattedDate } from '../lib/date';
import "./PostPage.scss";

const PostPage = () => {
  const { postNo } = useParams();
  const [post, setPost] = useState({});
  const request = useRequest();

  const onLoad = async () => {
    try {
      const data = await request.call(api.getPost, postNo);
      setPost(data.post);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    onLoad();
  }, [postNo]);

  return (
    <PageTemplate className="PostPage">
      <PostTitleBar
        title={post.title}
        nickname={post.nickname}
        imgFileName={post.imgFileName}
        writtenTime={getFormattedDate(post.writtenTime)}
      />
      <div className="inner-area">
        <p className="content">{post.content}</p>
        <div className="tag-area">
          {post.tags && post.tags.map(tag =>
            (<Tag key={tag.sequence} value={tag.value} />)
          )}
        </div>
        <hr className="divider" />
        <div className="comment-area">
          <h2 className="label">댓글 목록</h2>
          {auth.getUser() ?
            <CommentWriter nickname={auth.getNickname()} imgFileName={auth.getImgFileName()} /> :
          null}
          {post.comments && post.comments.map(comment => 
            (<Comment
              key={comment.no}
              commentNo={comment.no}
              author={comment.author}
              nickname={comment.nickname}
              content={comment.content}
              writtenTime={getFormattedDate(comment.writtenTime)}
              modifiedTime={getFormattedDate(comment.modifiedTime)}
              modified={comment.modified}
              imgFileName={comment.imgFileName}
            />)
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default PostPage;
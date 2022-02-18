import React from 'react';
import PostTitleBar from '../components/titlebar/PostTitleBar';
import PageTemplate from '../templates/PageTemplate';
import Tag from '../components/tag/Tag';
import CommentWriter from '../components/post/CommentWriter';
import Comment from '../components/post/Comment';
import "./PostPage.scss";

const PostPage = () => {
  return (
    <PageTemplate className="PostPage">
      <PostTitleBar />
      <div className="inner-area">
        <p className="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, repudiandae nihil. Incidunt cumque excepturi delectus totam quam, dolore quae accusamus obcaecati ipsum quidem, molestias quasi deleniti. Mollitia aspernatur iste dolores?
        </p>
        <div className="tag-area">
          <Tag value="태그A" />
          <Tag value="태그A" />
          <Tag value="태그A" />
          <Tag value="태그A" />
          <Tag value="태그A" />
          <Tag value="태그A" />
          <Tag value="태그A" />
          <Tag value="태그A" />
          <Tag value="태그A" />
        </div>
        <hr className="divider" />
        <div className="comment-area">
          <h2 className="label">댓글 목록</h2>
          <CommentWriter />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </PageTemplate>
  );
};

export default PostPage;
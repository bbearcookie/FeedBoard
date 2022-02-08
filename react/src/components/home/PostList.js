import React, { useCallback, useEffect, useState } from 'react';
import useRequest from '../../lib/useRequest';
import LoadingSpinner from '../../components/LoadingSpinner';
import * as api from '../../lib/api';
import Post from './Post';

const PostList = () => {
  const request = useRequest();
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    const data = await request.call(api.getPosts);
    setPosts(data.posts);
  }, [request]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {request.loading ? <LoadingSpinner /> : null}
      {posts.map(post => 
        <Post
          key={post.no}
          title={post.title}
          content={post.content}
          author={post.nickname}
          writtenTime={post.writtenTime}
          tags={post.tags}
        />
      )}
      {/* <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div>
      <div>aaaa</div> */}
    </>
  );
};

export default PostList;
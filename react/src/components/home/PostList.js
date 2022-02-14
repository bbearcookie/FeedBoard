import React, { useCallback, useEffect, useState } from 'react';
import useRequest from '../../lib/useRequest';
import LoadingSpinner from '../../components/LoadingSpinner';
import Post from './Post';

const PostList = ({ api, params }) => {
  const request = useRequest();
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const data = await request.call(api, params.username, params.tag);
      setPosts(data.posts);
    } catch (err) {
      // setPosts([]);
    }
  }, [request]);

  useEffect(() => {
    getPosts();
  }, [params]);

  return (
    <>
      {request.loading ? <LoadingSpinner /> : null}
      {posts ? 
        posts.map(post => 
          <Post
            key={post.no}
            title={post.title}
            content={post.content}
            author={post.nickname}
            writtenTime={post.writtenTime}
            tags={post.tags}
          />
        )
      : null}
    </>
  );
};

PostList.defaultProps = {
  api: '',
  params: []
};

export default PostList;
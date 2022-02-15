import React, { useCallback, useEffect, useState } from 'react';
import useRequest from '../../lib/useRequest';
import LoadingSpinner from '../../components/LoadingSpinner';
import Post from './Post';
import { patchFavorite } from '../../lib/api';
import './PostList.scss';

const PostList = ({ api, params }) => {
  const request = useRequest();
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const data = await request.call(api, params.username, params.tag);
      setPosts(data.posts);
    } catch (err) {
      
    }
  }, [request, params, api]);

  useEffect(() => {
    getPosts();
  }, [params]);

  const onFavorite = async (postNo) => {
    try {
      const res = await request.call(patchFavorite, postNo);
      setPosts(
        posts.map(post => post.no === postNo ?
        { ...post, favoriteUsers: res.favoriteUsers } : 
        {...post })
      );

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="PostList">
      {request.loading ? <LoadingSpinner /> : null}
      {posts ? 
        posts.map(post => 
          <Post
            key={post.no}
            postNo={post.no}
            title={post.title}
            content={post.content}
            author={post.nickname}
            writtenTime={post.writtenTime}
            tags={post.tags}
            favoriteUsers={post.favoriteUsers}
            onFavorite={onFavorite}
          />
        )
      : null}
    </div>
  );
};

PostList.defaultProps = {
  api: '',
  params: []
};

export default PostList;
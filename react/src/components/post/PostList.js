import React, { useCallback, useEffect, useState } from 'react';
import Post from './Post';
import useRequest from '../../lib/useRequest';
import LoadingSpinner from '../LoadingSpinner';
import { patchFavorite } from '../../lib/api';
import './PostList.scss';

const PostList = ({ api, params }) => {
  const [posts, setPosts] = useState([]);
  const request = useRequest();

  const onLoad = useCallback(async () => {
    try {
      const data = await request.call(api, params.username, params.tag, params.favorite);
      setPosts(data.posts);
    } catch (err) {
      
    }
  }, [request, params, api]);

  useEffect(() => {
    onLoad();
  }, [params]);

  // 좋아요 버튼 클릭시
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
            author={post.author}
            nickname={post.nickname}
            imgFileName={post.imgFileName}
            writtenTime={post.writtenTime}
            tags={post.tags}
            favoriteUsers={post.favoriteUsers}
            commentCnt={post.commentCnt}
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
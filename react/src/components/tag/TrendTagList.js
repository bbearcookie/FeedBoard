import React, { useEffect, useState, useCallback } from 'react';
import useRequest from '../../lib/useRequest';
import Tag from './Tag';
import TagContainer from '../../containers/TagContainer';
import * as api from '../../lib/api';
import './TrendTagList.scss';

const TrendTagList = () => {
  const [tags, setTags] = useState(null);
  const request = useRequest();

  const onLoad = useCallback(async e => {
    try {
      const res = await request.call(api.getTrendTags);
      setTags(res.tags);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="TrendTagList">
      <p className="title-label">일주일 트렌드 태그</p>
      <div className="item-area">
        {tags ? tags.map((tag, index) => (
          <TagContainer key={index} value={tag.value} />
        )) : null}
      </div>
    </div>
  );
};

export default TrendTagList;
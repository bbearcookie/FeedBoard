import React, { useState } from 'react';
import TagTab from '../TagTab';
import * as tagTab from '../../lib/tagTab';
import { useEffect } from 'react';

const initial_tags = [
  {
    id: 0,
    text: '작성한 글',
    active: true,
    queryKey: '',
  },
  {
    id: 1,
    text: '관심 있는 글',
    active: false,
    queryKey: 'favorite'
  },
];
const tagRefs = tagTab.getRefs(initial_tags);

const UserTagTab = ({ username, params }) => {
  const [tags, setTags] = useState(initial_tags);
  const [activePos, setActivePos] = useState(0); // 하단에 보여줄 주황색 divider의 애니메이션이 시작될 위치

  // Link의 to에 넣어줄 URL 반환
  const getURL = (id) => {
    let url = `/user/${username}`;

    if (tags[id].queryKey === 'favorite') {
      url += `?${tags[id].queryKey}=1`
    }

    return url;
  }

  const onActive = (id) => {
    setActivePos(tagTab.getActivePos(tags, tagRefs, id));
    setTags(tags.map(tag =>
      tag.id === id ?
      { ...tag, active: true } :
      { ...tag, active: false }
    ));
  }

  useEffect(() => {
    if (params.favorite) {
      setTags(tags.map(tag =>
        tag.queryKey === "favorite" ?
        { ...tag, active: true } :
        { ...tag, active: false }
      ));
    }
  }, []);

  return (
    <div className="UserTagTab">
      <TagTab
        tags={tags}
        refs={tagRefs}
        activePos={activePos}
        getURL={getURL}
        onActive={onActive}
      />
    </div>
  );
};

UserTagTab.defaultProps = {
  username: '',
  params: {}
};

export default UserTagTab;
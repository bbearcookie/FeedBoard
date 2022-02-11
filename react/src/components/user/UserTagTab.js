import React, { useState } from 'react';
import TagTab from '../home/TagTab';
import * as tagTab from '../../lib/tagTab';

const initial_tags = [
  {
    id: 0,
    text: '첫번째',
    active: true,
  },
  {
    id: 1,
    text: '두번째',
    active: false,
  },
  {
    id: 2,
    text: '세번째',
    active: false,
  },
  {
    id: 3,
    text: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    active: false,
  },
  {
    id: 4,
    text: '한글로길게게게게게게게게게게게게게게게게게게게게',
    active: false,
  },
  {
    id: 5,
    text: 'a',
    active: false,
  },
  {
    id: 6,
    text: 'a',
    active: false,
  },
  {
    id: 7,
    text: 'a',
    active: false,
  },
  {
    id: 8,
    text: 'a',
    active: false,
  },
  {
    id: 9,
    text: 'a',
    active: false,
  },
  {
    id: 10,
    text: 'a',
    active: false,
  },
  {
    id: 11,
    text: 'a',
    active: false,
  },
];
const tagRefs = tagTab.getRefs(initial_tags);

const UserTagTab = () => {
  const [tags, setTags] = useState(initial_tags);
  const [activePos, setActivePos] = useState(0); // 하단에 보여줄 주황색 divider의 애니메이션이 시작될 위치

  const onActive = (id) => {
    setActivePos(tagTab.getActivePos(tags, tagRefs, id));
    setTags(tags.map(tag =>
      tag.id === id ?
      { ...tag, active: true } :
      { ...tag, active: false }
    ));
  }

  return (
    <div className="UserTagTab">
      <TagTab
        tags={tags}
        refs={tagRefs}
        activePos={activePos}
        onActive={onActive}
      />
    </div>
  );
};

export default UserTagTab;
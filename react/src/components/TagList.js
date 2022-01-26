import React from 'react';
import './TagList.scss';
import TagListItem from './TagListItem';

const TagList = () => {
  return (
    <div className="TagList">
      <p className="title-label">최근 트렌드 태그</p>
      <div className="item-area">
        <TagListItem text="아이템1" />
        <TagListItem text="아이템2" />
        <TagListItem text="아이템3" />
        <TagListItem text="태그태그" />
        <TagListItem text="이런태그는?" />
        <TagListItem text="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" />
        <TagListItem text="이만큼 긴건 어떻게 되나" />
      </div>
    </div>
  );
};

export default TagList;
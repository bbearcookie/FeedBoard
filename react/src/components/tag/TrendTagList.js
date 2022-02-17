import React from 'react';
import Tag from './Tag';
import './TrendTagList.scss';

const TrendTagList = () => {
  return (
    <div className="TrendTagList">
      <p className="title-label">최근 트렌드 태그</p>
      <div className="item-area">
        <Tag value="이런태그는런태그는런태그는런태그는런a태그는런태그는런태그는런태그는런태그는런태그는런태그는런태그는런태그는런태그는런태그는런태그는?" />
        <Tag value="bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb한글ba한글한글만되네" />
        <Tag value="아이템1" />
        <Tag value="아이템2" />
        <Tag value="아이템3" />
        <Tag value="태그태그" />
        <Tag value="이런태그는?" />
        <Tag value="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" />
        <Tag value="이만큼 긴건 어떻게 되나" />
      </div>
    </div>
  );
};

export default TrendTagList;
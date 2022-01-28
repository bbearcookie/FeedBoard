import React from 'react';
import './TrendTagList.scss';
import TrendTagListItem from './TrendTagListItem';

const TrendTagList = () => {
  return (
    <div className="TrendTagList">
      <p className="title-label">최근 트렌드 태그</p>
      <div className="item-area">
        <TrendTagListItem text="아이템1" />
        <TrendTagListItem text="아이템2" />
        <TrendTagListItem text="아이템3" />
        <TrendTagListItem text="태그태그" />
        <TrendTagListItem text="이런태그는?" />
        <TrendTagListItem text="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" />
        <TrendTagListItem text="이만큼 긴건 어떻게 되나" />
      </div>
    </div>
  );
};

export default TrendTagList;
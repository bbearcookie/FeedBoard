import React from 'react';
import TitleBarTemplate from '../../templates/TitleBarTemplate';
import "./HomeTitleBar.scss";

const HomeTitleBar = () => {
  return (
    <TitleBarTemplate className="HomeTitleBar">
      <h1>FeedBoard</h1>
      <p>의견을 자유롭게 나눠보세요!</p>
    </TitleBarTemplate>
  );
};

export default HomeTitleBar;
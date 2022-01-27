import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="Footer">
      <nav>
        <p className="logo">FeedBoard</p>
        <p className="content">피드 형식으로 게시글을 남길 수 있는 웹 어플리케이션</p>
      </nav>
    </footer>
  );
};

export default Footer;
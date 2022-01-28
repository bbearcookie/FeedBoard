import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import "./TagTebItem.scss";
import classnames from 'classnames';

const TagTebItem = ({id, text, active, onClick}) => {
  return (
    <div
      className={classnames("TagTebItem", {'active': active})}
      onClick={() => onClick(id)}
    >
      <div className="content-area">
        <p className="label">{text}</p>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
      <div className="divider" />
    </div>
  );
};

export default TagTebItem;
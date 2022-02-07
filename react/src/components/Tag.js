import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import './Tag.scss';

const Tag = ({ className, tagId, value, onRemove }) => {
  // const { id, value } = tag;

  return (
    <span className={classNames("Tag", className)}>
      <span className="value">{value}</span>
      {onRemove ?
      <FontAwesomeIcon
        value={value}
        className="close"
        icon={faTimes}
        onClick={() => onRemove(tagId)}
      /> :
      null}
    </span>
  );
}

Tag.defaultProps = {
  classNames: "",
  value: "",
}

export default Tag;
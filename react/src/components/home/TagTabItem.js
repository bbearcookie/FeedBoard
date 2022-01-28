import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import "./TagTebItem.scss";
import classnames from 'classnames';

const TagTebItem = ({id, text, active, onActive, onRemove}) => {
  const onClickRemoveButton = useCallback((e) => {
    e.stopPropagation(); // 삭제 버튼 눌렀을 때 삭제하려는 상위 div 요소의 onActive(id)가 동작하는걸 방지함
    onRemove(id);
  }, [onRemove, id]);

  return (
    <div
      className={classnames("TagTebItem", {'active': active}, {'first': id === 0})}
      onClick={() => onActive(id)}
    >
      <div className="content-area">
        <p className="label">{text}</p>
        <FontAwesomeIcon
          className="icon"
          icon={faTimesCircle}
          onClick={onClickRemoveButton}
        />
      </div>
      <div className="divider" />
    </div>
  );
};

export default TagTebItem;
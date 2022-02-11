import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components'
import "./TagTebItem.scss";
import classnames from 'classnames';

const active = (activePos) => keyframes`
  0% {
    transform: translateX(${activePos}px);
  }

  100% {
    transform: translateX(0px);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
`;

const ActiveDivider = styled(Divider)`
  background: #ff7f50;
  animation: ${({activePos}) => active(activePos)} 0.5s;
`;

const TagTebItem = ({id, text, active, activePos, itemRef, onActive, onRemove}) => {
  const onClickRemoveButton = useCallback((e) => {
    e.stopPropagation(); // 삭제 버튼 눌렀을 때 삭제하려는 상위 div 요소의 onActive(id)가 동작하는걸 방지함
    onRemove(id);
  }, [onRemove, id]);

  return (
    <div
      className={classnames("TagTebItem", {'active': active}, {'first': id === 0})}
      onClick={() => onActive(id)}
      ref={itemRef}
    >
      <div className="content-area">
        <p className="label">{text}</p>
        {onRemove ?
        <FontAwesomeIcon
          className="icon"
          icon={faTimesCircle}
          onClick={onClickRemoveButton}
        />
        : null}
      </div>
      {active ?
      <ActiveDivider activePos={activePos} /> :
      <Divider />}
    </div>
  );
};

TagTebItem.defaultProps = {
  id: 0,
  text: '',
  active: false,
  activePos: 0,
  itemRef: null,
  onActive: () => {},
  onRemove: null
}

export default TagTebItem;
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import styled, { keyframes } from 'styled-components'
import "./TagTabItem.scss";

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

const TagTabItem = ({
  id,
  text, active, activePos,
  itemRef,
  getURL,
  onActive, onRemove}) => {

  const onClickRemoveButton = useCallback((e) => {
    e.stopPropagation(); // 삭제 버튼 눌렀을 때 삭제하려는 상위 div 요소의 onActive(id)가 동작하는걸 방지함
    e.preventDefault();
    onRemove(id);
  }, [onRemove, id]);

  return (
    <Link
      className={classnames("TagTabItem", {'active': active}, {'first': id === 0})}
      to={getURL(id)}
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
    </Link>
  );
};

TagTabItem.defaultProps = {
  id: 0,
  text: '',
  active: false,
  activePos: 0,
  itemRef: null,
  getURL: () => {},
  onActive: () => {},
  onRemove: null
}

export default TagTabItem;
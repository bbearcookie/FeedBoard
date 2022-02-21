import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import './Modal.scss';

const Modal = ({ title, setShow, children }) => {

  const close = (e) => {
    setShow(false);
  }

  return (
    <div className="ModalWrapper" onClick={close}>
      <div className="Modal" onClick={(e) => e.stopPropagation()}>
        <div className="Modal-header">
          <h3 className="title-label">{title}</h3>
          <FontAwesomeIcon className="close" icon={faTimes} onClick={close} />
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  title: '제목'
};

export default Modal;
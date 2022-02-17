import React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { insertActive } from '../modules/tagTab';

const TagContainer = () => {
  const dispatch = useDispatch();
  const onInsert = useCallback(text => {

  }, []);

  return (
    <div>
      
    </div>
  );
};

export default TagContainer;
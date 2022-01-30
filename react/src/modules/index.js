import { combineReducers } from 'redux';
import tagTab from './tagTab';
import form from './form';

const rootReducer = combineReducers({
  tagTab,
  form
});

export default rootReducer;
import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const initialState = {
  signup: {
    username: '',
    nickname: '',
    password: '',
    passwordConfirm: ''
  },
  signin: {
    username: '',
    password: ''
  }
}

const CHANGE_FIELD = 'form/CHANGE_INPUT';
const INITIALIZE_FORM = 'form/INITIALIZE_FORM';

// input 필드 값 변경 처리
export const changeField = createAction(
  CHANGE_FIELD,
  ({ formName, fieldName, value }) => ({ formName, fieldName, value })
);

// 해당 폼 안의 input 값들 초기화
export const initializeForm = createAction(INITIALIZE_FORM, formName => formName);

export default handleActions({
  [CHANGE_FIELD]: (state, { payload: { formName, fieldName, value } }) => 
    produce(state, draft => {
      draft[formName][fieldName] = value;
    }
  ),
  [INITIALIZE_FORM]: (state, { payload: formName }) =>
    produce(state, draft => {
      draft[formName] = initialState[formName];
    }
  )
}, initialState);
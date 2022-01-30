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

export const changeField = createAction(
  CHANGE_FIELD,
  ({ formName, fieldName, value }) => ({ formName, fieldName, value })
);

export default handleActions({
  [CHANGE_FIELD]: (state, { payload: { formName, fieldName, value } }) => produce(state, draft => {
    draft[formName][fieldName] = value;
  })
}, initialState);
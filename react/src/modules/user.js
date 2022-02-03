import { createAction, handleActions } from "redux-actions";

const initialState = {
  username: '',
  logged: false,
};

const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

export const login = createAction(LOGIN, username => username);
export const logout = createAction(LOGOUT);

export default handleActions({
  [LOGIN]: (state, { payload: username }) => ({ ...state, username, logged: true }),
  [LOGOUT]: (state) => initialState,
}, initialState);
import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const initialState = {
  input: '',
  tags: [
    {
      id: 0,
      text: "전체 게시글",
      active: true,
    }
  ],
  activePos: 0 // tag 밑에 주황색 divider를 얼만큼 이동시킬지를 저장
}
let nextId = 3;

const CHANGE_INPUT = 'tabTab/CHANGE_INPUT';
const INSERT = 'tagTab/INSERT';
const REMOVE = 'tagTab/REMOVE';
const ACTIVE = 'tagTab/ACTIVE';
const INSERT_ACTIVE = 'tagTab/INSERT_ACTIVE';
const SET_ACTIVE_POS = 'tagTab/SET_ACTIVE_POS';
const INIT_TAGS = 'tagTab/INIT_TAGS';

export const changeInput = createAction(CHANGE_INPUT, input => input);
export const insert = createAction(INSERT, text => ({
  id: nextId++,
  text,
  active: false
}));
export const remove = createAction(REMOVE, id => id);
export const active = createAction(ACTIVE, id => id);
export const insertActive = (text) => dispatch => {
  const result = dispatch(insert(text));
  return result.payload;
};
export const setActivePos = createAction(SET_ACTIVE_POS, activePos => activePos);
export const initTags = createAction(INIT_TAGS);

export default handleActions({
  [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
  [INSERT]: (state, { payload: tag }) => ({
    ...state,
    tags: state.tags.concat(tag),
    activePos: 0
  }),
  [REMOVE]: (state, { payload: id }) => ({
    ...state,
    tags: state.tags.filter(tag => tag.id !== id)
  }),
  [ACTIVE]: (state, { payload: id }) => produce(state, draft => {
    draft.tags = state.tags.map(item =>
      item.id === id ?
      { ...item, active: true } :
      { ...item, active: false }
    );
  }),
  [INSERT_ACTIVE]: (state, { payload: tag }) => produce(state, draft => {
    draft.tags = state.tags.map(item => ({ ...item, active: false })).concat(tag);
  }),
  [SET_ACTIVE_POS]: (state, { payload: activePos }) => ({
    ...state,
    activePos
  }),
  [INIT_TAGS]: (state) => ({ ...state, tags: initialState.tags })
}, initialState, {forwardRef: true});
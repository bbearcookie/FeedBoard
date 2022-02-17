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
const SET_ACTIVE_POS = 'tagTab/SET_ACTIVE_POS';

export const changeInput = createAction(CHANGE_INPUT, input => input);
export const insert = createAction(INSERT, text => ({
  id: nextId++,
  text,
  active: false
}));
export const remove = createAction(REMOVE, id => id);
export const active = createAction(ACTIVE, id => id);

// 태그를 추가하고 활성화 처리함. 중복된 태그는 추가하지 않음.
export const insertActive = (tags, text) => dispatch => {
  if (tags) {
    const index = tags.findIndex(item => item.text === text);
    if (index > 0) {
      dispatch(active(tags[index].id));
    } else {
      dispatch(insert(text));
      dispatch(active(nextId - 1));
    }
  } else {
    dispatch(insert(text));
  }
};
export const setActivePos = createAction(SET_ACTIVE_POS, activePos => activePos);

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
  [SET_ACTIVE_POS]: (state, { payload: activePos }) => ({
    ...state,
    activePos
  }),
}, initialState, {forwardRef: true});
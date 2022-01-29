import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

const initialState = {
  input: '',
  tags: [
    {
      id: 0,
      text: "Global Feed",
      active: true
    },
    {
      id: 1,
      text: "Two Feed",
      active: false
    },
    {
      id: 2,
      text: "Feed C",
      active: false
    },
  ]
}
let nextId = 3;

const CHANGE_INPUT = 'tabTab/CHANGE_INPUT';
const INSERT = 'tagTab/INSERT';
const REMOVE = 'tagTab/REMOVE';
const ACTIVE = 'tagTab/ACTIVE';

export const changeInput = createAction(CHANGE_INPUT, input => input);
export const insert = createAction(INSERT, text => ({
  id: nextId++,
  text,
  active: false
}));
export const remove = createAction(REMOVE, id => id);
export const active = createAction(ACTIVE, id => id);

export default handleActions({
  [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
  [INSERT]: (state, { payload: tag }) => ({ ...state, tags: state.tags.concat(tag) }),
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
  })
}, initialState);
import * as api from './api';

const KEY_NAME = 'user';

function saveToStoarage(user) { sessionStorage.setItem(KEY_NAME, JSON.stringify(user)); }
function removeFromStoarage() { sessionStorage.removeItem(KEY_NAME); }

export const login = async (request, form) => {
  try {
    const data = await request.call(api.postSignin, form);
    const user = { nickname: data.nickname };
    saveToStoarage(user);
  } catch (err) {
    throw err;
  }
}

export const logout = async (request) => {
  try {
    await request.call(api.postLogout);
    removeFromStoarage();
  } catch (err) {
    console.error(err);
  }
}

export const setUser = (nickname) => {
  const user = { nickname };
  saveToStoarage(user);
}
export const getUser = () => JSON.parse(sessionStorage.getItem(KEY_NAME));
export const removeUser = removeFromStoarage;
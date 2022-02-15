import * as api from './api';

const KEY_NAME = 'user';

function saveToStoarage(user) { sessionStorage.setItem(KEY_NAME, JSON.stringify(user)); }
function removeFromStoarage() { sessionStorage.removeItem(KEY_NAME); }

export const login = async (request, form) => {
  try {
    const data = await request.call(api.postSignin, form);
    const user = { username: data.username, nickname: data.nickname };
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

export const setUser = (username, nickname) => {
  const user = { username, nickname };
  saveToStoarage(user);
}
export const getUser = () => JSON.parse(sessionStorage.getItem(KEY_NAME));
export const getUsername = () => {
  const user = getUser();
  if (user)
    return user.username;
  else
    return undefined;
}
export const getNickname = () => {
  const user = getUser();
  if (user)
    return user.nickname;
  else
    return undefined;
}
export const removeUser = removeFromStoarage;
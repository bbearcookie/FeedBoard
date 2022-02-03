import * as api from './api';

const KEY_NAME = 'user';

export const login = async (request, form) => {
  try {
    const data = await request.call(api.postSignin, form);
    const user = { nickname: data.nickname };
    sessionStorage.setItem(KEY_NAME, JSON.stringify(user));
  } catch (err) {
    throw err;
  }
}

export const logout = async (request) => {
  try {
    await request.call(api.postLogout);
    sessionStorage.removeItem(KEY_NAME);
  } catch (err) {
    console.error(err);
  }
}

export const getUser = () => JSON.parse(sessionStorage.getItem(KEY_NAME));
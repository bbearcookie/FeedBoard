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

export const checkLogged = async (request) => {

  // 클라이언트의 스토리지에 로그인된 정보가 있으면 true.
  if (getUser()) {
    return true;
  }

  // 서버의 세션에 접속 정보가 남아있으면 true. 아니면 클라이언트 스토리지에서 지우고 false 반환.
  try {
    const data = await request.call(api.getCheckLogged);
    let user = { nickname: data.nickname }
    saveToStoarage(user);
    return true;
  } catch (err) {
    removeFromStoarage();
    console.error(err);
    return false;
  }

}

export const getUser = () => JSON.parse(sessionStorage.getItem(KEY_NAME));
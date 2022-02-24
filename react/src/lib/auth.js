export const KEY_NAME = 'user';
export function saveToStoarage(user) { sessionStorage.setItem(KEY_NAME, JSON.stringify(user)); }
export function removeFromStoarage() { sessionStorage.removeItem(KEY_NAME); }

// sessionStoarage에 저장할 객체의 형식을 반환
export function createUser(username, nickname, imgFileName) {
  return { username, nickname, imgFileName }
}
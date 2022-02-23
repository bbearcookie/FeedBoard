export const KEY_NAME = 'user';
export function saveToStoarage(user) { sessionStorage.setItem(KEY_NAME, JSON.stringify(user)); }
export function removeFromStoarage() { sessionStorage.removeItem(KEY_NAME); }

export function createUser(username, nickname, imgFileName) {
  return { username, nickname, imgFileName }
}
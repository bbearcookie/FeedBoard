import axios from "axios";

const BACKEND = 'http://localhost:5000';
const options = { withCredentials: true };

export const postSignin = (form) => axios.post(`${BACKEND}/auth/signin`,
  { username: form.username,
    password: form.password },
    options
);
export const postSignup = (form) => axios.post(`${BACKEND}/auth/signup`,
  { username: form.username,
    password: form.password,
    passwordConfirm: form.passwordConfirm,
    nickname: form.nickname },
    options
);
export const postLogout = () => axios.post(`${BACKEND}/auth/logout`, {}, options);
export const getCheckLogged = () => axios.get(`${BACKEND}/auth/check`, options);
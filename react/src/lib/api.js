import axios from "axios";

const BACKEND = 'http://localhost:5000';

export const getTest = () => axios.get(`${BACKEND}/test`);
export const postSignin = (form) => axios.post(`${BACKEND}/auth/signin`,
  { username: form.username,
    password: form.password }
);
export const postSignup = (form) => axios.post(`${BACKEND}/auth/signup`,
  { username: form.username,
    password: form.password,
    passwordConfirm: form.passwordConfirm,
    nickname: form.nickname }
);
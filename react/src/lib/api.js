import axios from "axios";

const BACKEND = 'http://localhost:5000';
const options = { withCredentials: true };

// 사용자 인증 관련
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

// 게시글 관련
export const postWrite = (form, tags) => axios.post(`${BACKEND}/writer`,
  { title: form.title,
    content: form.content,
    tags },
    options
);
export const getPosts = (author='', tag='', favorite='') =>
  axios.get(`${BACKEND}/post?author=${author}&tag=${tag}&favorite=${favorite}`,
  options
);
export const patchFavorite = (postNo) => axios.patch(`${BACKEND}/favorite/${postNo}`, {}, options);

// 사용자 관련
export const getNickname = (username) => axios.get(`${BACKEND}/nickname/${username}`, options);
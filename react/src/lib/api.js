import axios from "axios";

export const BACKEND = 'http://localhost:5000';
const options = { withCredentials: true };

export const kakaoLogin = `${BACKEND}/auth/signin/kakao`;

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
export const getLoggedUser = () => axios.get(`${BACKEND}/auth/user`, options);
export const putLoggedUser = (form) => {
  let formData = new FormData();
  formData.append('nickname', form.nickname);
  formData.append('introduce', form.introduce);
  formData.append('image', form.image);
  if (form.imageReset) formData.append('imageReset', form.imageReset);

  return axios.put(`${BACKEND}/auth/user`, formData,
    {
      ...options,
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );
}

// 게시글 관련
export const postPost = (form, tags) => axios.post(`${BACKEND}/post`,
  { title: form.title,
    content: form.content,
    tags },
    options
);
export const putPost = (postNo, form, tags) => axios.put(`${BACKEND}/post/${postNo}`,
  { title: form.title,
    content: form.content,
    tags },
    options
);
export const deletePost = (postNo) => axios.delete(`${BACKEND}/post/${postNo}`, options);
export const getPosts = (author='', tag='', favorite='') =>
  axios.get(`${BACKEND}/post?author=${author}&tag=${tag}&favorite=${favorite}`,
  options
);
export const getPost = (postNo) => axios.get(`${BACKEND}/post/${postNo}`, options);
export const patchFavorite = (postNo) => axios.patch(`${BACKEND}/favorite/${postNo}`, {}, options);

// 댓글 관련
export const postComment = (postNo, content) => axios.post(`${BACKEND}/comment`,
{ postNo, content },
options
);
export const putComment = (commentNo, content) => axios.put(`${BACKEND}/comment/${commentNo}`,
{ content },
options
);
export const deleteComment = (commentNo) => axios.delete(`${BACKEND}/comment/${commentNo}`, options);

// 사용자 관련
export const getUser = (username) => axios.get(`${BACKEND}/user/${username}`, options);

// 태그 관련
export const getTrendTags = () => axios.get(`${BACKEND}/trendTags`, options);
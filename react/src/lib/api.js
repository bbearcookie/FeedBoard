import axios from "axios";

const BACKEND = 'http://localhost:5000';

export const getTest = () => axios.get(`${BACKEND}/test`);
export const postSignup = (form) => axios.post(`${BACKEND}/auth/signup`, { form });
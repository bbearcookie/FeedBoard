import React, { createContext, useState } from 'react';
import * as api from '../lib/api';
import * as auth from '../lib/auth';

const initialUser = {
  username: '',
  nickname: '',
  imgFileName: ''
};

function getUser() {
  if (sessionStorage.getItem(auth.KEY_NAME)) {
    return JSON.parse(sessionStorage.getItem(auth.KEY_NAME));
  } else {
    return initialUser;
  }
};

const UserContext = createContext({
  user: { username: '', nickname: '', imgFileName: '' },
  actions: {
    setUser: () => {},
    login: () => {},
    logout: () => {}
  }
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const login = async (request, form) => {
    try {
      const data = await request.call(api.postSignin, form);
      const user = auth.createUser(data.username, data.nickname, data.imgFileName);
      auth.saveToStoarage(user);
      setUser(user);
    } catch (err) {
      throw err;
    }
  };

  const logout = async (request) => {
    try {
      await request.call(api.postLogout);
      auth.removeFromStoarage();
      setUser(initialUser);
    } catch (err) {
      console.error(err);
    }
  }

  const value = { user, setUser, login, logout };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer }
export default UserContext;
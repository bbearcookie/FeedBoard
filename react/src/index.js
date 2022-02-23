import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import ReduxThunk from 'redux-thunk';
import * as auth from './lib/auth';
import * as api from './lib/api';

(async function () {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

  // 앱 처음 실행시 서버로부터 로그인 상태를 확인함.
  try {
    const res = await api.getCheckLogged();
    if (res.data.nickname) {
      const user = auth.createUser(res.data.username, res.data.nickname, res.data.imgFileName);
      auth.saveToStoarage(user);
    }
  } catch (err) {
    console.error(err);
    // auth.removeUser();
    auth.removeFromStoarage();
  }
  
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  
})();
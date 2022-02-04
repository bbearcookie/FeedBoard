import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<div>반갑습</div>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;

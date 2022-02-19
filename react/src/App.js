import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Writer from './pages/Writer';
import PostPage from './pages/PostPage';
import UserSettingPage from './pages/UserSettingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hello" element={<div>반갑습</div>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="/setting/user" element={<UserSettingPage />} />
        <Route path="/writer" element={<Writer />} />
        <Route path="/post/:postNo" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;

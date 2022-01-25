import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="test" element={<div><p>test?</p><Outlet /></div>}>
            <Route path="b" element={<div>deep</div>} />
          </Route>
        </Route>
        <Route path="/hello" element={<div>반갑습</div>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import {AuthContext} from './context/AuthContext';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useContext} from 'react';
import Messenger from './pages/messenger/Messenger';

function App() {
  const {user} = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route
          path='/login'
          element={user ? <Navigate replace to='/' /> : <Login />}
        />
        <Route
          path='/register'
          element={user ? <Navigate replace to='/' /> : <Register />}
        />
        <Route
          path='/messenger'
          element={!user ? <Navigate replace to='/' /> : <Messenger />}
        />
        {user && <Route path={`/profile/:username`} element={<Profile />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

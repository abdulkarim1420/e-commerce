import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Website/HomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Users from './Pages/Dashboard/Users';
import GoogleCallBack from './Pages/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/RequireAuth';

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='auth/google/callback' element={<GoogleCallBack />}></Route>
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='users' element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import {Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import WelcomePage from './pages/Auth/WelcomePage/WelcomePage';
import HomePage from './pages/app/HomePage/HomePage';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<WelcomePage/>}/>
        <Route path='/login/*' element={<Navigate to="/login" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path='/*' element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

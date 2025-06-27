import './App.css';
import {Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/Auth/WelcomePage/WelcomePage';
import HomePage from './pages/app/HomePage/HomePage';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<WelcomePage/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import {Routes, Route } from 'react-router-dom';

import WelcomePage from './pages/Auth/WelcomePage/WelcomePage';
import HomePage from './pages/app/HomePage/HomePage';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<WelcomePage/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;

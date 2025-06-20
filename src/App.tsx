import './App.css';
import {Routes, Route } from 'react-router-dom';

import WelcomeScreen from './pages/Auth/WelcomeScreen/WelcomeScreen';
import HomeScreen from './pages/app/HomeScreen/HomeScreen';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<WelcomeScreen/>}/>
        <Route path='/home' element={<HomeScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;

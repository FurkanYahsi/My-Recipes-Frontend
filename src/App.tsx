import './App.css';
import {Routes, Route } from 'react-router-dom';

import WelcomeScreen from './pages/Auth/WelcomeScreen/WelcomeScreen';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<WelcomeScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;

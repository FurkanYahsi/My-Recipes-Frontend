import './App.css';
import {Routes, Route } from 'react-router-dom';

import SignInScreen from './pages/SignInScreen/SignInScreen';
import SignUpScreen from './pages/SignUpScreen/SignUpScreen';
import WelcomeScreen from './pages/WelcomeScreen/WelcomeScreen';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<WelcomeScreen/>}/>
        <Route path='/sign-in' element={<SignInScreen/>}/>
        <Route path='/sign-up' element={<SignUpScreen/>}/>
      </Routes>
      
    </div>
  );
}

export default App;

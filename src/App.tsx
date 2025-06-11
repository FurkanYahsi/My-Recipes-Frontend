import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';

import SignInScreen from './pages/SignInScreen/SignInScreen';
import SignUpScreen from './pages/SignUpScreen/SignUpScreen';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to="/sign-in" replace/>}/>
        <Route path='/sign-in' element={<SignInScreen/>}/>
        <Route path='/sign-up' element={<SignUpScreen/>}/>
      </Routes>
      
    </div>
  );
}

export default App;

import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';

import SignInScreen from './pages/SignInScreen/SignInScreen';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to="/sign-in" replace/>}/>
        <Route path='/sign-in' element={<SignInScreen/>}/>
      </Routes>
      
    </div>
  );
}

export default App;

import './App.css';
import {Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import WelcomePage from './pages/Auth/WelcomePage/WelcomePage';
import HomePage from './pages/app/HomePage/HomePage';

import ProtectedRoute from './utils/ProtectedRoute/ProtectedRoute';

function App() {

  const isAuth = false;

  // const AppLauyot = (
  //   <div>
  //     <Topbar/>
  //     <div>
  //       <Sidebar/>
  //       <Smain>{children}</Smain>
  //     </div>
  //   </div>
  // )


  return (
    <div className='App'>
{/* {
  isAuth ?
  <AppLayout>
  <Routes>
    
  </Routes></AppLayout> : 
  <div className = "login-css">  <Routes>

  </Routes>
  </div>

} */}



      <Routes>
        <Route
          element={<div className='login-layout'><Outlet /></div>}
        >
          <Route path='/login' element={<WelcomePage />} />
          <Route path='/login/*' element={<Navigate to="/login" replace />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path='/*' element={<Navigate to="/home" replace />} />
        </Route>
      </Routes> 
    </div>
  );
}

export default App;



import './App.css';
import {Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import WelcomePage from './pages/Auth/WelcomePage/WelcomePage';
import HomePage from './pages/app/HomePage/HomePage';
import TrendsPage from './pages/app/TrendsPage/TrendsPage';
import SendRecipePage from './pages/app/SendRecipePage/SendRecipePage';
import ViewRecipePage from './pages/app/ViewRecipePage/ViewRecipePage';
import FilteredRecipesPage from './pages/app/FilteredRecipesPage/FilteredRecipesPage';

import AppLayout from './utils/AppLayout/AppLayout';
import ProtectedRoute from './utils/ProtectedRoute/ProtectedRoute';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route
          element={<div className='login-layout'><Outlet /></div>}
        >
          <Route path='/login' element={<WelcomePage />} />
          <Route path='/login/*' element={<Navigate to="/login" replace />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/trends" element={<TrendsPage/>} />
            <Route path="/send-recipe" element={<SendRecipePage />} />
            <Route path="/recipe/:id" element={<ViewRecipePage />} />
            <Route path="/recipes" element={<FilteredRecipesPage />} />
            <Route path='/*' element={<Navigate to="/home" replace />} />
          </Route>
        </Route>
      </Routes> 
    </div>
  );
}

export default App;



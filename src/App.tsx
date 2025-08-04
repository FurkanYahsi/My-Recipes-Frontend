import './App.css';
import {Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import WelcomePage from './pages/Auth/WelcomePage/WelcomePage';
import HomePage from './pages/app/HomePage/HomePage';
import SendRecipePage from './pages/app/SendRecipePage/SendRecipePage';
import ViewRecipePage from './pages/app/ViewRecipePage/ViewRecipePage';
import ShowRecipes from './components/ShowRecipes/ShowRecipes';

import AppLayout from './utils/AppLayout/AppLayout';
import ProtectedRoute from './utils/ProtectedRoute/ProtectedRoute';

import { pageTypes } from './config/constants';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route
          element={<div className='login-layout'><Outlet /></div>}
        >
          <Route path='/login' element={<WelcomePage />}/>
          <Route path='*' element={<Navigate to="/login" replace />}/>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />}/>
            <Route path="/trends" element={<ShowRecipes type={pageTypes.TRENDS}/>}/>
            <Route path="/saved-recipes" element={<ShowRecipes type={pageTypes.BOOKMARKS}/>}/>
            <Route path="/liked-recipes" element={<ShowRecipes type={pageTypes.LIKES}/>}/>
            <Route path="/user-recipes" element={<ShowRecipes type={pageTypes.USER_RECIPES}/>}/>
            <Route path="/send-recipe" element={<SendRecipePage />} />
            <Route path="/recipe/:id" element={<ViewRecipePage />} />
            <Route path="/recipes" element={<ShowRecipes type= {pageTypes.FILTEREDS}/>}/>
            <Route path='/*' element={<Navigate to="/home" replace/>}/>
          </Route>
        </Route>
      </Routes> 
    </div>
  );
}

export default App;



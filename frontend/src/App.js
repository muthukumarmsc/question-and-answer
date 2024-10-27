import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Login from './Page/login'; 
import Register from './Page/register';
import Dashboard from './Page/dashboard';

const App = () => {

let isAuthenticated = localStorage.getItem("userToken");

  const routes = useRoutes([
    { path: "/", element: <Login disable={isAuthenticated ? <Navigate to="/dashboard" />: <Navigate to="/login"/>}/> },
    { path: "/login", element: <Login disable={isAuthenticated ? <Navigate to="/dashboard" />: <Navigate to="/login"/>} /> },
    { path: "/register", element: <Register disable={isAuthenticated ? false: true}/> },
    { path: "/dashboard", element: <Dashboard disable={isAuthenticated ? false: true}/> },
  ]);
  return routes; 
};

export default App;

import '@/styles/globals.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Signup from './routes/account/Signup';
import Login from './routes/account/Login';
import Home from './routes/Home';
import Projects from './routes/Projects';
import Workspace from './routes/Workspace';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="projects" element={<Projects />} />
      <Route path="workspace" element={<Workspace />} />

      <Route path="account">
        <Route index element={<div>Account</div>} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="app">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);

import '@/styles/globals.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Signup from './routes/account/Signup';
import Login from './routes/account/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
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

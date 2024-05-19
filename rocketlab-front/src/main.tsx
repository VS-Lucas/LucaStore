import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from './pages/Home.tsx';
import CartPage from './pages/Cart.tsx';

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    { path: "/", element: <HomePage /> },
    { path: "/cart", element: <CartPage /> }
  ]
}])

import { BadgeProvider } from './context/BadgeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BadgeProvider>
      <RouterProvider router={router} />
    </BadgeProvider>

  </React.StrictMode>,
);

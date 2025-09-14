// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import AgeCalculatorPage from './pages/AgeCalculatorPage.tsx';
import FutureEventPage from './pages/FutureEventPage.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // O layout principal com a navegação
    children: [
      {
        index: true, // Rota padrão (/)
        element: <AgeCalculatorPage />,
      },
      {
        path: 'evento-futuro',
        element: <FutureEventPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

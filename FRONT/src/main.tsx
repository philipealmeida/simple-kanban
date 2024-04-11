import ReactDOM from 'react-dom/client';
import Home from './pages/home/Home';
import '../src/styles/main.css';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

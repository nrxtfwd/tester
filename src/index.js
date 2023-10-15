import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/index.scss'
import { DecksContextProvider } from './context/DecksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DecksContextProvider>
    <App />
  </DecksContextProvider>
);
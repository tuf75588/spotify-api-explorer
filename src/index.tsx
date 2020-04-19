import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import ThemeContext from './contexts/ThemeContext';
ReactDOM.render(
  <React.StrictMode>
    <ThemeContext>
      <App />
    </ThemeContext>
  </React.StrictMode>,
  document.getElementById('root')
);

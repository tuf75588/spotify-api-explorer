import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import ThemeContext from './contexts/ThemeContext';
import GlobalStyles from './shared/global-styles';
ReactDOM.render(
  <React.StrictMode>
    <ThemeContext>
      <GlobalStyles />
      <App />
    </ThemeContext>
  </React.StrictMode>,
  document.getElementById('root')
);

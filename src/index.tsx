import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ThemeContext from './contexts/ThemeContext';
import GlobalStyles from './shared/global-styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoadingMessagePage } from './shared/pattern';
const User = React.lazy(() => import('./screens/user'));
const App = React.lazy(() => import('./app'));
ReactDOM.render(
  <React.StrictMode>
    <ThemeContext>
      <GlobalStyles />
      <React.Suspense
        fallback={
          <LoadingMessagePage>application is loading!</LoadingMessagePage>
        }
      >
        <Router>
          <Route exact path="/" component={App} />
          <Route path="/user/:username" component={User} />
        </Router>
      </React.Suspense>
    </ThemeContext>
  </React.StrictMode>,
  document.getElementById('root')
);

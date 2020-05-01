import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as SpotifyContext from './contexts/ApiUserContext';
import ThemeContext from './contexts/ThemeContext';
import GlobalStyles from './shared/global-styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoadingMessagePage } from './shared/pattern';
const User = React.lazy(() => import('./screens/user'));
const Home = React.lazy(() => import('./screens/home'));
function App(props: any) {
  return (
    <React.StrictMode>
      <SpotifyContext.Provider>
        <ThemeContext>
          <GlobalStyles />
          <React.Suspense
            fallback={
              <LoadingMessagePage>application is loading!</LoadingMessagePage>
            }
          >
            <Router>
              <Route path="/user/:username" component={User} />
              <Route path="/" exact component={Home} />
            </Router>
          </React.Suspense>
        </ThemeContext>
      </SpotifyContext.Provider>
    </React.StrictMode>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));

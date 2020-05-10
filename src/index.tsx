import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as SpotifyContext from './contexts/ApiUserContext';
import ThemeContext from './contexts/ThemeContext';
import GlobalStyles from './shared/global-styles';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {LoadingMessagePage} from './shared/pattern';
const Home = React.lazy(() => import('./screens/home'));
const Listing = React.lazy(() =>
  import('./screens/components/PlaylistListing')
);
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
              <Route path="/" exact component={Home} />
              <Route path="/:id" exact component={Listing} />
            </Router>
          </React.Suspense>
        </ThemeContext>
      </SpotifyContext.Provider>
    </React.StrictMode>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));

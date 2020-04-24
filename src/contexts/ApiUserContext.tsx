/**@jsx jsx*/
import React from 'react';
import { createBrowserHistory } from 'history';
import { jsx } from '@emotion/core';
import { PrimaryLoginButton } from '../shared/pattern';

import { useSafeSetState } from '../hooks/useSetState';
import { useApiRequest } from '../hooks/useApiRequest';
const APIClientContext = React.createContext({});
const { Provider, Consumer } = APIClientContext;

const history = createBrowserHistory();
const BASE_URL = 'https://accounts.spotify.com/authorize';
function SpotifyClientProvider(props: any) {
  const [client, setClient] = React.useState(() => {
    if (props.user) {
      return props.user;
    }
    const token = localStorage.getItem('spotify_token');
    if (token) {
      setClient(token);
    }
  });
  const [error, setError] = React.useState<null | string>(null);

  const login = () => {
    window.location.assign(
      `${BASE_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
    );
  };
  React.useEffect(() => {
    if (!!window.location.hash) {
      setClient('authorized');
      history.push('/user/authorized');
    }
  }, []);
  // this function is responsible for extracting a hash value from our callback route
  return client ? (
    <Provider value={client}>{props.children}</Provider>
  ) : (
    <div>
      <div
        css={{
          display: 'flex',
          marginTop: 300,
          justifyContent: 'center',
        }}
      >
        {error ? (
          <pre>{JSON.stringify(error, null, 2)}</pre>
        ) : (
          <PrimaryLoginButton onClick={login}>
            Login with Spotify
          </PrimaryLoginButton>
        )}
      </div>
      <p style={{ textAlign: 'center', marginTop: '2em' }}></p>
    </div>
  );
}

export { SpotifyClientProvider as Provider, Consumer, APIClientContext };

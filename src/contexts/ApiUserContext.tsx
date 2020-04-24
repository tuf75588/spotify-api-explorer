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

const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-modify-playback-state',
];

const BASE_URL = 'https://accounts.spotify.com/authorize';
function SpotifyClientProvider(props: any) {
  const [client, setClient] = React.useState(() => {
    if (props.user) {
      return props.user;
    }
    const token = localStorage.getItem('spotify_token');
    if (token) {
      console.log('running!');
      return getClient(token);
    }
  });
  const [error, setError] = React.useState<null | string>(null);

  function getClient(token) {
    console.log({ token }, 'testing this fake token');
  }

  function login() {
    const token = window.localStorage.setItem(
      'spotify_token',
      'spotify-token take 2'
    );
    setClient(getClient(token));
  }

  React.useEffect(() => {
    // first I want to check to see if there's an access token in localStorage
    if (!client) {
      history.push('/');
    }
  });
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
      <p style={{ textAlign: 'center', marginTop: '2em' }}>{client}</p>
    </div>
  );
}

export { SpotifyClientProvider as Provider, Consumer, APIClientContext };

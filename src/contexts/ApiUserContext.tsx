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
    if (props.client) {
      return props.client;
    }
    const token = localStorage.getItem('spotify_token');
    if (token) {
      // console.log('running!');
      // return getClient(token);
    }
  });
  const [error, setError] = React.useState<null | string>(null);

  React.useEffect(() => {
    const hash = window.location.hash;
    if (!!hash) {
      const value = window.location.hash.substr(1).split('&')[0];
      const token = value.slice(value.indexOf('=') + 1);
      console.log(token);
    }
  }, []);
  function getClient(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  function login() {
    const qs = `?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
    window.location.assign(`${BASE_URL}${qs}`);
  }

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

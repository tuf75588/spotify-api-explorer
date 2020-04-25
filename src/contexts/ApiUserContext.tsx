/**@jsx jsx*/
import React from 'react';
import { createBrowserHistory } from 'history';
import { jsx } from '@emotion/core';
import { PrimaryLoginButton } from '../shared/pattern';

import { useSafeSetState } from '../hooks/useSetState';
import { useApiRequest } from '../hooks/useApiRequest';
const APIClientContext = React.createContext({});
const { Provider, Consumer } = APIClientContext;

const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-modify-playback-state',
];

const BASE_URL = 'https://accounts.spotify.com/authorize';
function SpotifyClientProvider(props: any) {
  const [client, setClient] = React.useState('');
  const [error, setError] = React.useState<null | string>(null);

  React.useEffect(() => {
    // is there a token in localstorage?
    const params: any = getHashParams();
    if (params && params.access_token) {
      const { access_token, expires_in, token_type } = params;
      login(access_token);
    }

    // const hash = window.location.hash;
    // const value = hash?.substr(1).split('&')[0];
    // const token = value.slice(value.indexOf('=') + 1);
    // window.localStorage.setItem('spotify-token', token);
  }, []);

  function getHashParams() {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  async function login(token: string) {
    const request = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();
    console.log(data);
  }
  function getToken() {
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
          <PrimaryLoginButton onClick={getToken}>
            Login with Spotify
          </PrimaryLoginButton>
        )}
      </div>
      <p style={{ textAlign: 'center', marginTop: '2em' }}>{client}</p>
    </div>
  );
}

export { SpotifyClientProvider as Provider, Consumer, APIClientContext };

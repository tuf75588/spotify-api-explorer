/**@jsx jsx*/
import React from 'react';
import { createBrowserHistory } from 'history';
import { jsx } from '@emotion/core';
import { PrimaryLoginButton } from '../shared/pattern';

const APIClientContext = React.createContext({});
const { Provider, Consumer } = APIClientContext;
let history = createBrowserHistory();

type Hash = {
  access_token?: string | null;
  token_type?: string;
  expires_in?: number;
};

const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-modify-playback-state',
];

const BASE_URL = 'https://accounts.spotify.com/authorize';
function SpotifyClientProvider(props: any) {
  const [client, setClient] = React.useState<string | null>('');
  const [error, setError] = React.useState<null | string>(null);

  // in this effect, we will grab the hash value from the window that came back from our request
  React.useEffect(() => {
    // check if there is a hash value present
    if (window.location.hash) {
      const hash: any = getHashParams();
      const existingToken = window.localStorage.getItem('spotify-token');
      // if there is no token in localStorage && hash is truthy..let's continue
      if (hash && !existingToken) {
        window.localStorage.setItem('spotify-token', hash.access_token);
      }
    }
  });
  // exchanges client information for an access token for web api access.
  function handShake() {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const queryString = `?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${scopes}&show_dialog=true`;
    const url = `${BASE_URL}${queryString}`;
    window.location.assign(url);
  }

  // s/o to stackoverflow for this awesome function to retrieve a hash value!
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
  function getClient(token: string) {
    const headers = { Authorization: `Bearer: ${token}` };
  }
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
          <PrimaryLoginButton onClick={handShake}>
            Login with Spotify
          </PrimaryLoginButton>
        )}
      </div>
      <p style={{ textAlign: 'center', marginTop: '2em' }}>{client}</p>
    </div>
  );
}

export { SpotifyClientProvider as Provider, Consumer, APIClientContext };

/**@jsx jsx*/
import React from 'react';
import {createBrowserHistory} from 'history';
import {jsx} from '@emotion/core';
import {PrimaryLoginButton} from '../shared/pattern';

const APIClientContext = React.createContext({});
const {Provider, Consumer} = APIClientContext;
let history = createBrowserHistory();

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
    const hashUrl: any = window.location.hash && getHashParams();
    if (hashUrl) {
      window.localStorage.setItem('spotify-token', hashUrl.access_token);
      history.push('/');
    }
  });

  React.useEffect(() => {
    const userToken = window.localStorage.getItem('spotify-token');
    if (userToken) {
      setClient(userToken);
    }
  }, []);

  // exchanges client information for an access token for web api access.
  async function handShake() {
    const token: any = window.localStorage.getItem('spotify-token');
    if (!token) {
      const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
      const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
      const queryString = `?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${scopes}&show_dialog=true`;
      const url = `${BASE_URL}${queryString}`;
      window.location.assign(url);
    } else {
      setClient(token);
      getClient();
    }
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

  function getClient() {
    return Object.assign(client, {login, logout});
  }

  async function login() {
    // this function will set user state and forward our home UI
    await handShake().catch((error) => {
      console.log(error);
      setError(error);
    });
  }
  function logout() {
    window.localStorage.removeItem('spotify-token');
    setClient(null);
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
          <PrimaryLoginButton onClick={login}>
            Login with Spotify
          </PrimaryLoginButton>
        )}
      </div>
    </div>
  );
}

export {
  SpotifyClientProvider as Provider,
  Consumer,
  APIClientContext as Context,
};

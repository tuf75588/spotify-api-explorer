/**@jsx jsx*/
import React from 'react';
import { createBrowserHistory } from 'history';
import { jsx } from '@emotion/core';
import { PrimaryLoginButton } from '../shared/pattern';

const APIClientContext = React.createContext({});
const { Provider, Consumer } = APIClientContext;
let history = createBrowserHistory();
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-modify-playback-state',
];

const BASE_URL = 'https://accounts.spotify.com/authorize';
function SpotifyClientProvider(props: any) {
  const [client, setClient] = React.useState<any>(() => {
    const token = localStorage.getItem('spotify-token');
    if (token) {
      // if there's an existing token
      return getClient(token);
    }
  });
  const [error, setError] = React.useState<null | string>(null);

  React.useEffect(() => {
    const token = window.localStorage.getItem('spotify-token');
    if (token) {
      // redirect the user somewhere
      history.push('/user/loggedin');
    } else {
      const params: any = getHashParams();
      getClient(params.access_token);
    }
  }, []);
  // exchanges client information for an access token for web api access.
  const handShake = () => {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const queryString = `?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${scopes}`;
    const url = `${BASE_URL}${queryString}`;
    window.location.assign(url);
  };

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

  // function to log user into the spotify API
  async function getClient(token) {
    window.localStorage.setItem('spotify-token', token);
    const request = await fetch(`https://api.spotify.com/v1/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();
    setClient(response);
    history.push(`/user/${response.id}`);
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

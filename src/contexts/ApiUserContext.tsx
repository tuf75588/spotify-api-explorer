/**@jsx jsx*/
import React from 'react';
import {createBrowserHistory} from 'history';
import {jsx} from '@emotion/core';
import {PrimaryLoginButton} from '../shared/pattern';

const APIClientContext = React.createContext({});
const {Provider, Consumer} = APIClientContext;
let history = createBrowserHistory();

type Client = {
  Authorization: string;
};

const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
  'user-modify-playback-state',
];
const WEB_API_ENDPOINT = 'https://api.spotify.com/v1/me';
const BASE_URL = 'https://accounts.spotify.com/authorize';
function SpotifyClientProvider(props: any) {
  const [client, setClient] = React.useState<any>(() => {
    if (props.client) {
      return props.client;
    }
    const token = window.localStorage.getItem('spotify-token');
    if (token) {
      return getClient(token);
    }
  });
  const [error, setError] = React.useState<null | string>(null);

  // in this effect, we will grab the hash value from the window that came back from our request
  React.useEffect(() => {
    // check if there is a hash value present
    if (!client) {
      history.push('/');
    }
    if (window.location.hash) {
      const hash: any = getHashParams();
      // if there is no token in localStorage && hash is truthy..let's continue
      if (hash.access_token && !client) {
        window.localStorage.setItem('spotify-token', hash.access_token);
        getClient(hash.access_token);
        history.push('/');
      }
    }
  });

  // exchanges client information for an access token for web api access.
  async function handShake() {
    const token: any = window.localStorage.getItem('spotify-token');
    if (!token) {
      const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
      const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
      const queryString = `?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${scopes}&show_dialog=true`;
      const url = `${BASE_URL}${queryString}`;
      window.location.assign(url);
    }
    if (token) {
      setClient(getClient(token));
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
  async function getClient(token: string) {
    try {
      const request = await fetch(`${WEB_API_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await request.json();
      return Object.assign(data, {login, logout});
    } catch (error) {
      console.log(error.message);
      setError('Oh no, there was an error!');
    }
  }

  async function login() {
    // this function will set user state and forward our home UI
    handShake();
  }
  function logout() {
    // remove token from localstorage
    // set client state to null
    // redirect user back to login view
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
      <p style={{textAlign: 'center', marginTop: '2em'}}>{client}</p>
    </div>
  );
}

export {SpotifyClientProvider as Provider, Consumer, APIClientContext};

/**@jsx jsx*/
import React from 'react';
import client from '../utils/client';
import { createBrowserHistory } from 'history';
import { jsx } from '@emotion/core';
import { PrimaryLoginButton } from '../shared/pattern';

import { useSafeSetState } from '../hooks/useSetState';
import { useApiRequest } from '../hooks/useApiRequest';
const APIClientContext = React.createContext({});
const { Provider, Consumer } = APIClientContext;
export const ApiProviderContext = Provider;
export const ApiConsumerContext = Consumer;
const history = createBrowserHistory();
const BASE_URL = 'https://accounts.spotify.com/authorize';
function SpotifyClientProvider(props: any) {
  // const [state, setState] = useSafeSetState({
  //   loaded: false,
  //   fetching: false,
  //   data: null,
  //   error: null,
  // });
  const { loading, data, error: errors } = useApiRequest(
    'https://api.github.com/zen'
  );
  console.log(loading, data, errors);
  // let history = useHistory();
  const [user, setUser] = React.useState(() => {
    if (props.user) {
      return props.user;
    }
    const token = window.localStorage.getItem('spotify-token');
    if (token) {
      setUser(token);
    }
  });
  const [error, setError] = React.useState<null | string>(null);
  React.useEffect(() => {
    if (!client) {
      history.push('/');
    }

    // if the user navigates away from the page, zap them back home
    const unlisten = history.listen(() => {
      if (!client) {
        history.push('/');
      }
    });
    console.log(window.location.hash);
    return () => {
      unlisten();
    };
  });

  const login = async () => {
    // here we will make the call to spotify
    const qs = `?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=token`;
    // const data = await client(`${BASE_URL}${qs}`).catch((error) => {
    //   setError('Oh no, there was an error!');
    // });
    // window.location.assign(`${BASE_URL}${qs}`);
  };

  return user ? (
    <SpotifyClientProvider value={user}>{props.children}</SpotifyClientProvider>
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

export { SpotifyClientProvider as Provider };

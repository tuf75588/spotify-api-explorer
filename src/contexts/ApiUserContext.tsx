import React from 'react';
import client from '../utils/client';
import { createBrowserHistory } from 'history';

const APIClientContext = React.createContext({});
const { Provider, Consumer } = APIClientContext;
export const ApiProviderContext = Provider;
export const ApiConsumerContext = Consumer;

const history = createBrowserHistory();

function SpotifyClientProvider(props: any) {
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
  const [error, setError] = React.useState(null);
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

    return () => {
      unlisten();
    };
  });

  return user ? (
    <SpotifyClientProvider value={user}>{props.children}</SpotifyClientProvider>
  ) : (
    <div>
      {error ? (
        <pre>{JSON.stringify(error, null, 2)}</pre>
      ) : (
        <button>
          Login with spotify right this very second for an awesome experience!
        </button>
      )}
    </div>
  );
}

export { SpotifyClientProvider as Provider };

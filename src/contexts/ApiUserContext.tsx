import React from 'react';
import client from '../utils/client';
import { useHistory } from 'react-router-dom';

const APIClientContext = React.createContext({});
const { Provider, Consumer } = APIClientContext;
export const ApiProviderContext = Provider;
export const ApiConsumerContext = Consumer;

function SpotifyClientProvider(props: any) {
  let history = useHistory();
  const [client, setClient] = React.useState(() => {
    if (props.client) {
      return props.client;
    }
    const token = window.localStorage.getItem('spotify-token');
    if (token) {
      setClient(token);
    }
  });
  React.useEffect(() => {
    if (!client) {
      history.push('/');
    }
    return () => {
      console.log('unmounting!');
    };
  });
}

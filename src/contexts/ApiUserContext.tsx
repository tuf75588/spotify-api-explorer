import React from 'react';

const APIClientContext = React.createContext({});
const { Provider, Consumer } = APIClientContext;
export const ApiProviderContext = Provider;
export const ApiConsumerContext = Consumer;

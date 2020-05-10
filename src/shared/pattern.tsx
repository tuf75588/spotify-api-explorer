/* @jsx jsx */
import React from 'react';
import styled from '@emotion/styled/macro';
import {jsx} from '@emotion/core';
import {Link} from 'react-router-dom';
export const IsolatedContainer = (props: any) => {
  return (
    <div
      {...props}
      css={{
        marginTop: 300,
        display: 'flex',
        justifyContent: 'center',
        color: '#f1f1f1',
      }}
    />
  );
};

const Button = styled.button({
  display: 'inline-block',
  fontWeight: 400,
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: '1.5',
  border: '1px solid transparent',
  color: '#fff',
  backgroundColor: '#007bff',
  borderColor: '#007bff',
  padding: '.375rem .75rem',
});

const PrimaryLoginButton = styled(Button)({
  borderRadius: '5px',
  '&:hover': {
    opacity: '0.8',
  },
  cursor: 'pointer',
});

type Loading = {
  children: React.ReactNode;
};
const LoadingMessagePage = ({children}: Loading) => {
  return <IsolatedContainer>{children}</IsolatedContainer>;
};

export {PrimaryLoginButton, LoadingMessagePage};

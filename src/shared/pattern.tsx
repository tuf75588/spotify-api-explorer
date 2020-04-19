/* @jsx jsx */
import React from 'react';
import styled from '@emotion/styled/macro';
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
export const IsolatedContainer = (props: object) => {
  return (
    <div
      {...props}
      css={{
        marginTop: 300,
        display: 'flex',
        justifyContent: 'center',
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

export { PrimaryLoginButton };

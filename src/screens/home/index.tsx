import React, {useContext, useState, useEffect} from 'react';
import {Context as SpotifyContext} from '../../contexts/ApiUserContext';
import Logo from './Logo';
import styled from '@emotion/styled';

const Heading = styled.h1`
  color: #fff;
  font-weight: 300;
`;

const LogoutBtn = styled.button`
  color: #000;
  padding: 2em;
`;

type User = {
  id?: string;
};

function Home(props) {
  const [user, setUser] = useState<any>('');
  const spotify = useContext<any>(SpotifyContext);
  useEffect(() => {
    spotify.then((res) => {
      if (res) {
        setUser(res);
      }
    });
  }, [spotify, user]);
  return (
    <div>
      <Logo />
      <Heading>Welcome {user.id}</Heading>
      <LogoutBtn onClick={user.logout}>Logout</LogoutBtn>
    </div>
  );
}

export default Home;

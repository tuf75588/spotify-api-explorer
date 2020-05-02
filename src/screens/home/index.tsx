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
  country?: string;
  followers?: number;
};

function Home(props) {
  const [user, setUser] = useState<User>({});
  const token = useContext<any>(SpotifyContext);

  useEffect(() => {
    const connectToWebAPI = async () => {
      const WEB_API_ENDPOINT = 'https://api.spotify.com/v1/me';

      const request = await fetch(WEB_API_ENDPOINT, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (request.status === 401 || !request.ok) {
        // our token has expired
        console.error('FETCH A NEW TOKEN!');
        throw new Error(request.statusText);
      }
      const response = await request.json();
      setUser(response);
    };
    connectToWebAPI();
    // only run if our token changes
  }, [setUser, token]);
  if (!user) return <p style={{color: '#fff'}}>loading user information...</p>;
  return (
    <div>
      <Heading>
        Welcome {user.id} {user.country}
      </Heading>
    </div>
  );
}

export default Home;

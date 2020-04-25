import React from 'react';
import { useParams } from 'react-router-dom';
function User(props: any) {
  const { username } = useParams();
  console.log(username);
  return <h1>Welcome {username}!</h1>;
}

export default User;

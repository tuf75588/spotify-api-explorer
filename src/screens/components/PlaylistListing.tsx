/**  @jsx jsx  */
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {jsx, css} from '@emotion/core';

const Hero = (props) => (
  <p
    css={{
      fontSize: '2rem',
      color: '#fff',
    }}
    {...props}
  />
);

function PlaylistListing() {
  const {state: items} = useLocation();
  console.log(items);
  return <Hero>track listing!</Hero>;
}

export default PlaylistListing;

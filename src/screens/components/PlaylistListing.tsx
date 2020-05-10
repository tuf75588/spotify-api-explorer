/**  @jsx jsx  */
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {jsx} from '@emotion/core';
import {IsolatedContainer} from '../../shared/pattern';
const Hero = (props) => (
  <p
    css={{
      fontSize: '2rem',
      color: '#fff',
      textAlign: 'center',
    }}
    {...props}
  />
);

function PlaylistListing() {
  const {state: items} = useLocation();
  const title = items.images[0].url ?? 'Loading..';
  return (
    <section>
      <Hero>
        <img
          css={{maxWidth: '100%', maxHeight: '100%'}}
          alt="playlist cover"
          src={title}
        />
      </Hero>
      <IsolatedContainer> !</IsolatedContainer>
    </section>
  );
}

export default PlaylistListing;

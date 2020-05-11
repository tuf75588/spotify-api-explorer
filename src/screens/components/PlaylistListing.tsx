/**  @jsx jsx  */
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {jsx} from '@emotion/core';
import {IsolatedContainer} from '../../shared/pattern';
const Hero = (props) => (
  <div
    css={{
      fontSize: '2rem',
      color: '#fff',
      textAlign: 'center',
      display: 'flex',
      backgroundImage:
        'linear-gradient( 109.6deg,  rgba(33,99,255,0.5) 11.2%, rgba(0,10,139,1) 100.2% )',
      padding: '1em',
      margin: '0 auto',
      maxWidth: '100%',

      img: {
        paddingRight: '2em',
      },
    }}
    {...props}
  />
);

function PlaylistListing() {
  const {state: items} = useLocation();
  const title = items.images[0].url ?? 'Loading..';
  return (
    <div>
      <Hero>
        <img css={{display: 'block'}} alt="playlist cover" src={title} />
        <p>playlist information</p>
      </Hero>
      <div css={{width: '75%', paddingLeft: '1em'}}>
        <input
          css={{
            backgroundColor: '#121212',
            color: '#f1f1f1',
            border: 0,
            minWidth: '100%',
          }}
          placeholder="🔎 Search"
        />
      </div>
      <IsolatedContainer></IsolatedContainer>
    </div>
  );
}

export default PlaylistListing;

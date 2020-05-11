/**  @jsx jsx  */
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {jsx} from '@emotion/core';
import {IsolatedContainer} from '../../shared/pattern';
import {Image} from '../../shared/types';
const Hero = (props) => (
  <div
    css={{
      fontSize: '2rem',
      color: '#fff',
      textAlign: 'center',
      display: 'flex',
      backgroundImage: '#2b2622',
      padding: '1em',
      margin: '0 auto',
      maxWidth: '100%',
      borderBottom: '0.5px solid rgba(255,255,255,0.2)',
      aside: {
        marginTop: '3rem',
      },
      p: {
        fontSize: '1rem',
        fontWeight: 'bold',
        paddingLeft: '1.5rem',
      },
      '.description': {
        fontWeight: '100',
        marginTop: '1rem',
      },
      '.credits': {
        fontWeight: 'normal',
        paddingTop: '0.5rem',
      },
      '.credits span': {
        fontWeight: 'bold',
      },
    }}
    {...props}
  />
);

function PlaylistListing() {
  const {state: items}: any = useLocation();

  const title = items.images[0].url ?? 'Loading..';
  return (
    <div>
      <Hero>
        <img
          css={{display: 'block', height: 200, marginTop: '10px'}}
          alt="playlist cover"
          src={title}
        />
        <div css={{textAlign: 'left'}}>
          <p>PLAYLIST</p>

          <h1 css={{paddingLeft: '1.5rem'}}>{items.name}</h1>
          <aside>
            <p className="description">{items.description}</p>
            <p className="credits">
              <span>{items.owner.display_name}</span> ° 2,618,705 likes ° 6 hr
              41 min{' '}
            </p>
          </aside>
        </div>
      </Hero>
      <div css={{width: '75%', paddingLeft: '1em'}}>
        <input
          css={{
            backgroundColor: '#121212',
            color: '#f1f1f1',
            border: 0,
            minWidth: '100%',
            padding: '1em',
            '&:focus': {
              outline: '0.5px solid grey',
            },
          }}
          placeholder="🔎 Search"
        />
      </div>
      <IsolatedContainer></IsolatedContainer>
    </div>
  );
}

export default PlaylistListing;

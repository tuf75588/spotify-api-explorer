import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from '@emotion/styled';
import {Context as SpotifyContext} from '../../contexts/ApiUserContext';
const StyledItem = styled.div`
  text-align: center;
  padding: 0.5em;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const GridContainer = styled.main`
  padding: 1em;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  background-color: #2c3134;
  background-clip: padding-box;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

function PlaylistGrid() {
  const token = useContext(SpotifyContext);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    async function fetchPlaylists() {
      const WEB_API_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

      const request = await fetch(WEB_API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (request.ok) {
        const {items} = await request.json();

        setPlaylists(items);
      }
    }
    fetchPlaylists();
  }, [token]);
  // on user login, i would like to show all the playlists that user has saved
  if (!playlists.length)
    return <p style={{color: 'white'}}>loading playlist data..</p>;

  return (
    <GridContainer>
      {playlists.map(
        (item: {
          id: string;
          name: string;
          description: string;
          images: Array<{url: string}>;
        }) => {
          const playlistImg = item.images.length ? item.images[0].url : '';

          return (
            <StyledItem key={item.id}>
              <Link
                to={{
                  pathname: `/${item.id}`,
                  state: {
                    ...item,
                  },
                }}
              >
                <div>
                  {playlistImg ? (
                    <Img src={playlistImg} alt="playlist cover art" />
                  ) : (
                    <p style={{paddingBottom: '2em'}}>
                      <span role="img" aria-label="emoji expression">
                        No album art available at this time 😥
                      </span>
                    </p>
                  )}
                </div>
              </Link>
              <p>{item.name}</p>
            </StyledItem>
          );
        }
      )}
    </GridContainer>
  );
}

export default PlaylistGrid;

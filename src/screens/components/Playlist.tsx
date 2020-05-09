import React, {useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {Context as SpotifyContext} from '../../contexts/ApiUserContext';
const StyledItem = styled.div`
  border: 1px solid grey;
  text-align: center;
  padding: 1em;
`;

const GridContainer = styled.main`
  padding: 1em;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
  if (!playlists) return <p>loading playlist data..</p>;
  return (
    <GridContainer>
      {playlists.map((item: {name: string; images: any}) => {
        const playlistImg = item.images.length ? item.images[0].url : '';
        console.log(playlistImg);
        return (
          <StyledItem>
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
            {item.name}
          </StyledItem>
        );
      })}
    </GridContainer>
  );
}

export default PlaylistGrid;

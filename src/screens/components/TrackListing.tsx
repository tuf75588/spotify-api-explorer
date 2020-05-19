import React from 'react';
import styled from '@emotion/styled/macro';
// component responsible for rendering all tracks included in the selected playlist

// COMPONENTS Specific to TrackListing
const StyledContainer = styled.section`
  display: flex;
  color: #fff;
  flex-direction: column;
  align-items: center;
  max-width: 1500px;
  margin: 0 auto;
  list-style-type: none;
`;

const StyledListItem = styled.li`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  padding: 1em;
  width: 100%;
  p {
    width: 100%;
  }
  .artist-name {
    text-align: center;
  }
  .album {
    text-align: right;
  }
`;

const ListContainer = styled.ul`
  width: 100%;
`;

function TopToolbar() {
  console.log('im re-rendering but nothing has changed!');
  return (
    <nav>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
          listStyleType: 'none',
          fontWeight: 'bold',
        }}
      >
        <li>Name</li>
        <li>Artist</li>
        <li>Album</li>
      </ul>
    </nav>
  );
}

function TrackListing({data}) {
  const alwaysMemo = (component) => React.memo(component, () => true);
  const Toolbar = alwaysMemo(TopToolbar);
  return (
    <StyledContainer>
      <ListContainer>
        <Toolbar />
        {data.map(
          ({
            track: {
              name,
              id,
              album: {name: albumName},
            },
          }) => {
            return (
              <StyledListItem key={id}>
                <p>{name.length > 35 ? name.slice(0, 10) + '...' : name}</p>
                <p className="artist-name">artist name</p>
                <p className="album">{albumName}</p>
              </StyledListItem>
            );
          }
        )}
      </ListContainer>
    </StyledContainer>
  );
}

export default TrackListing;

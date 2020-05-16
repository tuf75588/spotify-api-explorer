import React from 'react';
import styled from '@emotion/styled/macro';
// component responsible for rendering all tracks included in the selected playlist

// COMPONENTS Specific to TrackListing
const StyledContainer = styled.ul`
  display: flex;
  color: #fff;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  list-style-type: none;
`;

const StyledListItem = styled.li`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 0 0.5rem 1rem;
  width: 100%;
`;

// COMPONENTS specific to TopToolbar
const ToolbarList = styled.ul`
  display: flex;
  justify-content: center;
  color: #fff;
`;

function TopToolbar() {
  return (
    <div>
      <ToolbarList>
        <li>title</li>
        <li>title</li>
        <li>title</li>
        <li>title</li>
      </ToolbarList>
    </div>
  );
}

function TrackListing({data}) {
  console.log(data);
  return (
    <div>
      <TopToolbar />
      <StyledContainer>
        {data.map(({track: {name, id}}) => {
          return <StyledListItem key={id}>{name}</StyledListItem>;
        })}
      </StyledContainer>
    </div>
  );
}

export default TrackListing;

import React from 'react';
import styled from '@emotion/styled/macro';
// component responsible for rendering all tracks included in the selected playlist

const StyledContainer = styled.section`
  display: flex;
  color: #fff;
  padding: 0.5rem 0 0.5rem 1rem;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 1200px;
  margin: 0 auto;
`;

function TrackListing({data}) {
  console.log(data);
  return (
    <StyledContainer>
      <p>A list of tracks</p>
    </StyledContainer>
  );
}

export default TrackListing;

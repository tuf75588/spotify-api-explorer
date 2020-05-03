import React from 'react';
import styled from '@emotion/styled';

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

function PlaylistGrid() {
  // on user login, i would like to show all the playlists that user has saved
  return (
    <GridContainer>
      <StyledItem>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
        similique ad labore aut ut provident voluptatum vero veritatis natus
        accusamus quisquam quis, culpa explicabo est consequuntur deleniti!
        Consectetur, praesentium nulla?
      </StyledItem>
      <StyledItem>2</StyledItem>
      <StyledItem>3</StyledItem>
      <StyledItem>4</StyledItem>
      <StyledItem>5</StyledItem>
      <StyledItem>5</StyledItem>
      <StyledItem>5</StyledItem>
      <StyledItem>5</StyledItem>
      <StyledItem>5</StyledItem>
      <StyledItem>5</StyledItem>
      <StyledItem>5</StyledItem>
    </GridContainer>
  );
}

export default PlaylistGrid;

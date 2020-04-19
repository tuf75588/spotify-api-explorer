import styled from '@emotion/styled/macro';

const sizes = {
  phone: 768,
  tablet: 992,
  desktop: 1200,
};
const queries = {
  tiny: `@media (max-width: ${sizes.phone}px)`,
  phone: `@media (min-width: ${sizes.phone}px)`,
  tablet: `@media (min-width: ${sizes.tablet}px)`,
  desktop: `@media (min-width: ${sizes.desktop}px)`,
};

const Container = styled.div({
  paddingLeft: '15px',
  paddingRight: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  [queries.phone]: {
    maxWidth: '750px',
  },
  [queries.tablet]: {
    maxWidth: '970px',
  },
  [queries.desktop]: {
    maxWidth: '1170px',
  },
});

const Row = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const Column = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export { Container, Row, Column };

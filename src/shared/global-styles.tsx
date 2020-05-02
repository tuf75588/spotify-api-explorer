import React from 'react';
import {Global, css} from '@emotion/core';

function GlobalStyles() {
  return (
    <div>
      <Global
        styles={css`
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          html {
            background-color: #121212;
          }
          svg {
            color: #fff;
          }
        `}
      />
    </div>
  );
}

export default GlobalStyles;

import React from 'react';

import { ThemeProvider } from 'emotion-theming';

const theme = {
  common: {
    borderBottom: { borderBottom: '1px solid #eee' },
  },
  colors: {
    primary: 'skyblue',
    secondary: 'rebeccapurple',
    mainColor: 'mistyrose',
    faded: '#666',
    fadedExtra: '#888',
  },
};

export default (props: object) => <ThemeProvider {...props} theme={theme} />;

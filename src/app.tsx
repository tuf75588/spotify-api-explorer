import React from 'react';
import { useTheme } from 'emotion-theming';
function App() {
  const theme = useTheme();
  console.log(theme);
  return <div>this is the start of something cool!</div>;
}

export default App;

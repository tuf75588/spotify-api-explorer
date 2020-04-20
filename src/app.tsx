import React from 'react';
import { IsolatedContainer, PrimaryLoginButton } from './shared/pattern';
function App(props: any) {
  return (
    <IsolatedContainer>
      <PrimaryLoginButton>login with spotify </PrimaryLoginButton>
    </IsolatedContainer>
  );
}

export default App;

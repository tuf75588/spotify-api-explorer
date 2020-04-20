import React from 'react';
import { IsolatedContainer, PrimaryLoginButton } from './shared/pattern';
import { useHistory } from 'react-router-dom';
function App(props: any) {
  let history = useHistory();
  return (
    <IsolatedContainer>
      <PrimaryLoginButton onClick={() => history.push('/user/atd285')}>
        login with spotify{' '}
      </PrimaryLoginButton>
    </IsolatedContainer>
  );
}

export default App;

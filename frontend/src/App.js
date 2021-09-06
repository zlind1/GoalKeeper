import React from 'react';
import AppContext from './AppContext';
import LoginModal from './components/LoginModal';

function App() {
  const localData = (key) => {
    return JSON.parse(localStorage.getItem(key));
  }
  const state = {
    accessToken: React.useState(localData('accessToken')),
    refreshToken: React.useState(localData('refreshToken'))
  }
  const setData = (data) => {
    for (const key of Object.keys(data)) {
      const value = data[key]
      const [, setter] = state[key];
      setter(value);
      if (value === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }
  const context = {
    accessToken: state.accessToken[0],
    refreshToken: state.refreshToken[0],
    setData: setData
  }
  return (
    <AppContext.Provider value={context}>
      <LoginModal/>
      <p>
        {context.accessToken && `Access Token: ${context.accessToken}`}
      </p>
      <p>
        {context.refreshToken && `Refresh Token: ${context.refreshToken}`}
      </p>
    </AppContext.Provider>
  );
}

export default App;

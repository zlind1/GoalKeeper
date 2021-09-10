import React from 'react';
import AppContext from './AppContext';
import LoginModal from './components/LoginModal';
import GoalList from './components/GoalList';
import api from './util/api';

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
  const refresh = async () => {
    const response = await api.get('/refresh', state.refreshToken[0]);
    if (response.ok) {
      await setData({
        accessToken: response.access_token,
        refreshToken: response.refresh_token
      });
    } else {
      await setData({
        accessToken: null,
        refreshToken: null
      });
    }
  }
  const context = {
    accessToken: state.accessToken[0],
    refreshToken: state.refreshToken[0],
    refresh: refresh,
    setData: setData
  }
  return (
    <AppContext.Provider value={context}>
      <LoginModal/>
      {context.accessToken && <GoalList/>}
    </AppContext.Provider>
  );
}

export default App;

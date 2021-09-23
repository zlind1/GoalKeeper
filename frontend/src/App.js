import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppContext from './AppContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GoalsPage from './pages/GoalsPage';
import NotFoundPage from './pages/NotFoundPage';
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
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/goals' component={GoalsPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

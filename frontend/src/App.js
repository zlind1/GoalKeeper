import React from 'react';
import AppContext from './AppContext';
import LoginModal from './components/LoginModal';

function App() {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const setters = {
    user: setUser,
  }
  const setData = (key, value) => {
    setters[key](value);
    localStorage.setItem(key, JSON.stringify(value));
  }
  const context = {
    user,
    setData
  }
  return (
    <AppContext.Provider value={context}>
      <LoginModal/>
      <p>
        {context.user && `Hello, ${context.user.username}`}
      </p>
    </AppContext.Provider>
  );
}

export default App;

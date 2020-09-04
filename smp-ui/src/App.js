import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header';
import Content from './components/Content/Content';

const UserContext = React.createContext(null)

function App() {
  const [user, setUser] = useState(null);

  const userContextState = {
    user,
    login: (user) => setUser(user),
    logout: () => setUser(null),
    loggedIn: () => !!user
  }

  return (
    <UserContext.Provider value={userContextState}>
      <Router>
        <Header />
        <Content />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
export {UserContext}

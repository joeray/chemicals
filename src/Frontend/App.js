import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchRowList from './Pages/SearchRowList';
import { GlobalContext } from './context';
import Home from './Pages/Home';
import Login from './Pages/Login';
import './App.css';

export default function App() {
  const [appContext, setAppContext] = useState({});
  return (
    <GlobalContext.Provider
      value={{
        ...appContext,
        setAppContext: props =>
          setAppContext(prevContext => ({
            ...prevContext,
            ...props,
          })),
      }}
    >
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/rowlist/:list/:group">
              <SearchRowList />
            </Route>
          </Switch>
        </div>
      </Router>
    </GlobalContext.Provider>
  );
}

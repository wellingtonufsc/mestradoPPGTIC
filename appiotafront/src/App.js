import React from 'react';
import Background from './shared/components/background/Background';
import Login from './users/pages/Login';
import Dashboard from './products/pages/Dashboard';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import './App.scss';

function App() {
  const { userName, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!userName,
        userName: userName,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <BrowserRouter>
        <Route render={({location}) => {
          return(
            <TransitionGroup component={null}>
              <CSSTransition
                unmountOnExit
                timeout={1000}
                classNames={'pageSliderLeft'}
                key={location.key}
              >
                <Switch location={location}>
                  <Route path="/" exact>
                    <React.Fragment>
                      <Login /> <Background />
                    </React.Fragment>
                  </Route>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )
        }} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

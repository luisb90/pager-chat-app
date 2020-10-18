import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import styles from './App.module.css';

const Login = lazy(() => import('./pages/Login/Login'));
const Chat = lazy(() => import('./pages/Chat/Chat'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const App = () => {
  const [selectedUsername, setSelectedUsername] = useState('');

  return (
    <Router>
      <div className={styles.App}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Redirect exact from="/" to={selectedUsername ? '/chat' : '/login'} />
            <Route
              path="/login"
              exact
              render={routerProps => <Login {...routerProps} onNextClicked={setSelectedUsername} />}
            />
            <Route
              path="/chat"
              exact
              render={routerProps => <Chat {...routerProps} username={selectedUsername} />}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;

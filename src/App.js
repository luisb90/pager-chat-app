import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import styles from './App.module.css';
import NotFound from './pages/NotFound/NotFound';

const Login = lazy(() => import('./pages/Login/Login'));
const Chat = lazy(() => import('./pages/Chat/Chat'));

const App = () => {
  const [selectedUserName, setSelectedUserName] = useState('');

  return (
    <Router>
      <div className={styles.App}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Redirect exact from="/" to={selectedUserName ? '/chat' : '/login'} />
            <Route
              path="/login"
              exact
              render={routerProps => <Login {...routerProps} onNextClicked={setSelectedUserName} />}
            />
            <Route
              path="/chat"
              exact
              render={routerProps => <Chat {...routerProps} userName={selectedUserName} />}
            />
            <Route
              render={routerProps => <NotFound {...routerProps} userName={selectedUserName} />}
            />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;

import React, { useState } from 'react';

import LoginPrompt from '../../components/Login/LoginPrompt/LoginPrompt';

import styles from './Login.module.css';

const Login = props => {
  const [username, setUsername] = useState('');

  const handleInput = ev => {
    setUsername(ev.target.value);
  };

  const handleNextClick = () => {
    props.onNextClicked(username);
    props.history.push('/chat');
    return;
  };

  return (
    <div className={styles.Login}>
      <LoginPrompt username={username} onInput={handleInput} onNextClick={handleNextClick} />
    </div>
  );
};

export default Login;

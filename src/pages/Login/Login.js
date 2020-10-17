import React, { useState } from 'react';

import Prompt from '../../components/Login/Prompt';

import styles from './Login.module.css';

const Login = props => {
  const [userName, setUserName] = useState('');

  const handleInput = ev => {
    setUserName(ev.target.value);
  };

  const handleNextClick = () => {
    props.onNextClicked(userName);
    props.history.push('/chat');
    return;
  };

  return (
    <div className={styles.Login}>
      <Prompt userName={userName} onInput={handleInput} onNextClick={handleNextClick} />
    </div>
  );
};

export default Login;

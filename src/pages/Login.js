import React, { useEffect, useRef, useState } from 'react';

import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';

import styles from './Login.module.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInput = ev => {
    setUserName(ev.target.value);
  };

  const handleNextClick = () => {
    // stubbed
    return;
  };

  return (
    <div className={styles.Login}>
      <div className={styles.Prompt}>
        <div className={styles.Header}>Join chat</div>
        <Input
          ref={inputRef}
          label="Please enter your username"
          value={userName}
          onChange={handleInput}
        />
        <Button onClick={handleNextClick}>Next</Button>
      </div>
    </div>
  );
};

export default Login;

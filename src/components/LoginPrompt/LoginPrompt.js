import React, { useEffect, useRef } from 'react';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import styles from './LoginPrompt.module.css';

const LoginPrompt = props => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.LoginPrompt}>
      <div className={styles.Header}>Join chat</div>
      <div className={styles.InputWrapper}>
        <Input
          ref={inputRef}
          label="Please enter your username"
          value={props.username}
          onChange={props.onInput}
        />
      </div>
      <Button onClick={props.onNextClick}>Next</Button>
    </div>
  );
};

export default LoginPrompt;

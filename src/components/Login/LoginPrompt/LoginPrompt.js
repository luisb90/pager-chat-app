import React, { useEffect, useRef } from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import styles from './LoginPrompt.module.css';

const LoginPrompt = props => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyPress = event => {
    if (event.key === 'Enter' && inputRef.current.value.trim()) {
      props.onNextClick();
    }
  };

  return (
    <div className={styles.LoginPrompt}>
      <div className={styles.Header}>Join chat</div>
      <div className={styles.InputWrapper}>
        <Input
          ref={inputRef}
          label="Please enter your username"
          value={props.username}
          onChange={props.onInput}
          onKeyPress={handleKeyPress}
        />
      </div>
      <Button onClick={props.onNextClick} disabled={!inputRef.current?.value.trim()}>
        Next
      </Button>
    </div>
  );
};

export default LoginPrompt;

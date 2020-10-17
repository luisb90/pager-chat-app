import React, { useEffect, useRef } from 'react';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import styles from './Prompt.module.css';

const Prompt = props => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.Prompt}>
      <div className={styles.Header}>Join chat</div>
      <Input
        ref={inputRef}
        label="Please enter your username"
        value={props.userName}
        onChange={props.onInput}
      />
      <Button onClick={props.onNextClick}>Next</Button>
    </div>
  );
};

export default Prompt;

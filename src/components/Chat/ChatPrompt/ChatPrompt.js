import React, { useEffect, useRef } from 'react';

import Input from '../../UI/Input/Input';
import LinkButton from '../../UI/LinkButton/LinkButton';

import ChatMessage from './ChatMessage/ChatMessage';
import styles from './ChatPrompt.module.css';

const ChatPrompt = props => {
  const inputRef = useRef();
  const inputColor = '#C2C2C2';
  let inputContent = <LinkButton color={inputColor}>Send</LinkButton>;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.ChatPrompt}>
      <div className={styles.ChatContainer}>
        {props.messages.map(msg => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}
      </div>
      <div className={styles.InputContainer}>
        <Input ref={inputRef} inputcontent={inputContent} color={inputColor} />
        <div className={styles.Typing}>Pam is typing...</div>
      </div>
    </div>
  );
};

export default ChatPrompt;

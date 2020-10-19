import React, { useEffect, useLayoutEffect, useRef } from 'react';

import Input from '../../UI/Input/Input';
import LinkButton from '../../UI/LinkButton/LinkButton';

import ChatMessage from './ChatMessage/ChatMessage';
import styles from './ChatPrompt.module.css';

const ChatPrompt = props => {
  const inputRef = useRef();
  const messagesEndRef = useRef();
  const inputColor = '#C2C2C2';
  const inputContent = (
    <LinkButton
      color={inputColor}
      onClick={() => {
        props.onSendMessage(inputRef.current.value);
        inputRef.current.value = '';
      }}
    >
      Send
    </LinkButton>
  );

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useLayoutEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, [props.messages]);

  return (
    <div className={styles.ChatPrompt}>
      <div className={styles.ChatContainer}>
        {props.messages.map(msg => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.InputContainer}>
        <Input ref={inputRef} inputcontent={inputContent} color={inputColor} />
        <div className={styles.Typing}>Pam is typing...</div>
      </div>
    </div>
  );
};

export default ChatPrompt;

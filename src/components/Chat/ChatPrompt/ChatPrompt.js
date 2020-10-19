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

  let typing;
  if (props.typers.length) {
    const msg =
      props.typers.length > 1 ? 'People are typing...' : `${props.typers[0]} is typing...`;
    typing = <div className={styles.Typing}>{msg}</div>;
  }

  return (
    <div className={styles.ChatPrompt}>
      <div className={styles.ChatContainer}>
        {props.messages.map(msg => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.InputContainer}>
        <Input
          ref={inputRef}
          inputcontent={inputContent}
          onChange={props.onTyping}
          color={inputColor}
        />
        {typing}
      </div>
    </div>
  );
};

export default ChatPrompt;

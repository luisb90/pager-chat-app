import React, { useEffect, useRef } from 'react';

import Input from '../../UI/Input/Input';
import LinkButton from '../../UI/LinkButton/LinkButton';

import ChatMessage from './ChatMessage/ChatMessage';
import styles from './ChatPrompt.module.css';

const ChatPrompt = props => {
  const inputRef = useRef();
  const messagesEndRef = useRef();
  const inputColor = '#CACACA';
  const inputContent = (
    <LinkButton color={inputColor} onClick={handleEnter} disabled={!inputRef.current?.value.trim()}>
      Send
    </LinkButton>
  );

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, [props.messages]);

  const handleKeyPress = event => {
    if (event.key === 'Enter' && inputRef.current.value.trim()) {
      handleEnter();
    }
  };

  const handleEnter = () => {
    const val = inputRef.current.value;
    const valSplit = val.trim().split('/gif ');

    // if the message value started with "/gif ", we assume it's an image message and call out to the giphy API.
    if (valSplit.length > 1) {
      fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=4mRTNgnjJ17oxDULcwFEcTj8oAxpO2CM&q=${valSplit[1]}`
      )
        .then(res => res.json())
        .then(gifs => {
          const dataLen = gifs.data.length - 1;

          const randomGif = gifs.data[Math.floor(Math.random() * dataLen)];
          if (randomGif) {
            props.onSendImageMessage(randomGif.images.downsized.url);
          }
        });
    } else {
      props.onSendTextMessage(valSplit[0]);
    }

    inputRef.current.value = '';
  };

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
        <div className={styles.GifHint}>{'Type /gif <phrase> to send a relevant gif.'}</div>
        <Input
          ref={inputRef}
          inputcontent={inputContent}
          onChange={props.onTyping}
          onKeyPress={handleKeyPress}
          color={inputColor}
        />
        {typing}
      </div>
    </div>
  );
};

export default ChatPrompt;

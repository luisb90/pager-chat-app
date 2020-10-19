import React, { useEffect, useState } from 'react';
import cuid from 'cuid';

import ChatPrompt from '../../components/Chat/ChatPrompt/ChatPrompt';
import ChatSocketService from '../../socket/ChatSocket.service';
import Utils from '../../utils/Utils';

import styles from './Chat.module.css';

let socketService;
let timeout;

const Chat = props => {
  const [messages, setMessages] = useState([]);
  const [typers, setTypers] = useState([]);

  useEffect(() => {
    if (!props.username) {
      props.history.push('/login');
      return;
    }

    socketService = new ChatSocketService(
      `https://pager-hiring.herokuapp.com/?username=${props.username}`,
      {
        userConnected: username => {
          console.log('[Socket] I connected:', username);
        },
        userDisconnected: username => {
          console.log('[Socket] I disconnected:', username);
        },
        isTyping: typers => {
          setTypers(
            Object.entries(typers).reduce((acc, [username, status]) => {
              if (username !== props.username && status) {
                acc.push(username);
              }

              return acc;
            }, [])
          );
        },
        message: handleSocketMessage,
      }
    );

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleSocketMessage = message => {
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      const formattedTime = Utils.getTimeFromDate(message.time);
      const content = message.type === 'text' ? message.text : message.url;
      let newMessages;

      // if the current message was sent by the current user and at the same minute as the last, we append it to the last
      // ChatMessage instead of creating a new one. This keeps messages grouped and causes less clutter.
      if (lastMessage?.username === message.username && lastMessage.time === formattedTime) {
        newMessages = [...prev.map(m => ({ ...m, values: [...m.values] }))];
        newMessages[newMessages.length - 1].values.push({ type: message.type, content });
      } else {
        const newMessage = {
          id: cuid(),
          username: message.username,
          type: message.type,
          time: formattedTime,
          values: [{ type: message.type, content }],
        };

        newMessages = [...prev, newMessage];
      }

      return newMessages;
    });
  };

  const handleSendTextMessage = textMessage => {
    socketService.sendTextMessage(textMessage);
  };

  const handleSendImageMessage = image => {
    socketService.sendImageMessage(image);
  };

  const handleTyping = () => {
    socketService.setTypingStatus(true);

    // If we have an active timeout, clear it to prep for the new one below. This way the typing status
    // will only clear if they're done typing, avoiding flickers.
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    timeout = setTimeout(() => {
      socketService.setTypingStatus(false);
    }, 500);
  };

  return (
    <div className={styles.Chat}>
      <ChatPrompt
        messages={messages}
        typers={typers}
        onSendTextMessage={handleSendTextMessage}
        onSendImageMessage={handleSendImageMessage}
        onTyping={handleTyping}
      />
    </div>
  );
};

export default Chat;

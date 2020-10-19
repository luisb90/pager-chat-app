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
      let newMessages;

      // if the current message was sent by the current user and at the same minute as the last, we append it to the last
      // ChatMessage instead of creating a new one. This keeps messages grouped and causes less clutter.
      if (lastMessage?.username === message.username && lastMessage.time === formattedTime) {
        newMessages = [...prev.map(m => ({ ...m, text: [...m.text] }))];
        newMessages[newMessages.length - 1].text.push(message.text);
      } else {
        const newMessage = {
          id: cuid(),
          username: message.username,
          type: message.type,
          time: formattedTime,
          text: [message.text],
        };

        newMessages = [...prev, newMessage];
      }

      return newMessages;
    });
  };

  const handleSendMessage = textMessage => {
    socketService.sendTextMessage(textMessage);
  };

  const handleTyping = () => {
    socketService.setTypingStatus(true);
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
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
      />
    </div>
  );
};

export default Chat;

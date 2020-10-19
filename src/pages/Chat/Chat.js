import React, { useEffect, useState } from 'react';
import cuid from 'cuid';
import io from 'socket.io-client';

import ChatPrompt from '../../components/Chat/ChatPrompt/ChatPrompt';
import ChatSocketService from '../../socket/ChatSocket.service';
import Utils from '../../utils/Utils';

import styles from './Chat.module.css';

let socketService;

const Chat = props => {
  const [messages, setMessages] = useState([]);

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
          console.log('[Socket] typers:', typers);
        },
        message: handleMessage,
      }
    );

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleMessage = message => {
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      const formattedTime = Utils.getTimeFromDate(message.time);
      let newMessages;

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

  return (
    <div className={styles.Chat}>
      <ChatPrompt messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;

import React, { useEffect } from 'react';

import ChatPrompt from '../../components/Chat/ChatPrompt/ChatPrompt';

import styles from './Chat.module.css';

const Chat = props => {
  const messages = [
    {
      id: '1',
      type: 'text',
      username: 'luisb90',
      time: new Date(),
      text: ['heya'],
    },
    {
      id: '2',
      type: 'text',
      username: 'obello30',
      time: new Date(),
      text: ['sup'],
    },
    {
      id: '3',
      type: 'text',
      username: 'arturib',
      time: new Date(),
      text: ['Cool!'],
    },
  ];

  return (
    <div className={styles.Chat}>
      <ChatPrompt messages={messages} />
    </div>
  );
};

export default Chat;

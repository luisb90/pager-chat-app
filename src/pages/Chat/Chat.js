import React from 'react';

import styles from './Chat.module.css';

const Chat = props => {
  return <div className={styles.Chat}>Chat app, username: {props.userName}</div>;
};

export default Chat;

import React, { memo, useEffect, useState } from 'react';

import styles from './ChatMessage.module.css';

const ChatMessage = ({ msg }) => {
  const avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    msg.username
  )}&size=80&background=EEEEEE&font-size=0.35&bold=true`;

  const formattedTime = msg.time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className={styles.ChatMessage}>
      <div className={styles.Avatar}>
        <img src={avatarSrc} alt={msg.username[0]} />
      </div>
      <div>
        <div>
          <span className={styles.Username}>{msg.username}</span>{' '}
          <span className={styles.Time}>{formattedTime}</span>
        </div>
        <div className={styles.Text}>{msg.text}</div>
      </div>
    </div>
  );
};

export default memo(ChatMessage);

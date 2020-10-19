import React, { memo } from 'react';

import styles from './ChatMessage.module.css';

const ChatMessage = ({ msg }) => {
  const avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    msg.username
  )}&size=80&background=EEEEEE&font-size=0.35&bold=true`;

  return (
    <div className={styles.ChatMessage}>
      <div className={styles.Avatar}>
        <img src={avatarSrc} alt={msg.username[0]} />
      </div>
      <div>
        <div>
          <span className={styles.Username}>{msg.username}</span>{' '}
          <span className={styles.Time}>{msg.time}</span>
        </div>
        {msg.text.map((text, i) => (
          <div key={i} className={styles.Text}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ChatMessage);

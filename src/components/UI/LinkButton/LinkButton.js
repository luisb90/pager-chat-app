import React from 'react';

import styles from './LinkButton.module.css';

const LinkButton = props => {
  return (
    <button className={styles.LinkButton} {...props} style={{ color: props.color }}>
      {props.children}
    </button>
  );
};

export default LinkButton;

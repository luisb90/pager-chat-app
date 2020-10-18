import React from 'react';

import Button from '../../components/UI/Button/Button';

import styles from './NotFound.module.css';

const NotFound = ({ history }) => {
  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className={styles.NotFound}>
      <div className={styles.Header}>This is not the page you're looking for.</div>
      <Button onClick={handleClick}>Go home</Button>
    </div>
  );
};

export default NotFound;

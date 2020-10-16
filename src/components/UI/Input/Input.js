import React, { forwardRef } from 'react';

import styles from './Input.module.css';

const Input = forwardRef(({ label, ...props }, ref) => {
  const labelEl = label ? <label className={styles.Label}>{label}</label> : null;

  return (
    <>
      {labelEl}
      <input ref={ref} className={styles.Input} {...props} />
    </>
  );
});

export default Input;

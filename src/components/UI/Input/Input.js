import React, { forwardRef } from 'react';

import styles from './Input.module.css';

const Input = forwardRef(({ label, ...props }, ref) => {
  const labelEl = label ? <label className={styles.Label}>{label}</label> : null;
  const inputContent = props.inputcontent ? (
    <div className={styles.InputContent}>{props.inputcontent}</div>
  ) : null;

  return (
    <>
      {labelEl}
      <div className={styles.Container}>
        <div className={styles.InputEl}>
          <input ref={ref} className={styles.Input} {...props} style={{ color: props.color }} />
        </div>
        {inputContent}
      </div>
    </>
  );
});

export default Input;

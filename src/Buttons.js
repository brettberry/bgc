
import React from 'react';
import classnames from 'classnames';

function Button({ text, className, onClick }) {
  return (
    <div className={classnames('button', className)} onClick={onClick}>
      <span className="buttonText">{text}</span>
    </div>
  );
}


export default Button;


import React from 'react';

function Button({ text, onClick }) {
  return (
    <div className="button" onClick={onClick}>
      <span className="buttonText">{text}</span>
    </div>
  );
}

export default Button;

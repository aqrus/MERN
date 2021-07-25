import React from 'react';


function ErrorMessageBox(props) {
  const {message, variant} = props;
  return (
    <div className={`alert alert-${variant || 'info'}`}>
      {message}
    </div>
  );
}

export default ErrorMessageBox;
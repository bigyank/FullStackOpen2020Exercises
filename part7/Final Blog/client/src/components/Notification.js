import React from 'react';
import { useSelector } from 'react-redux';

import { Alert } from '@material-ui/lab';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const divStyle = {
    height: 40,
  };

  return (
    <div style={divStyle}>
      {notification ? (
        <Alert severity={notification.type}>{notification.message} </Alert>
      ) : (
        <div style={divStyle}>{null}</div>
      )}
    </div>
  );
};

export default Notification;

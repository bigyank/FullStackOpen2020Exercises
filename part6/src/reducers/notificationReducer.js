export const setNotification = (message) => {
  return {
    type: 'NEW_NOTIFICATION',
    message,
  };
};

export const removeNotification = () => {
  return {
    type: 'NEW_NOTIFICATION',
    message: null,
  };
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.message;
    default:
      return state;
  }
};

export default notificationReducer;

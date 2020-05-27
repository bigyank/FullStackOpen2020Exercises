export const setNotification = (message, timer) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(removeNotification());
    }, timer * 1000);

    dispatch({
      type: 'NEW_NOTIFICATION',
      message,
    });
  };
};

const removeNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

const notificationReducer = (state = 'Welcome', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.message;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export default notificationReducer;

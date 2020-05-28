export const setNotification = (message, timer) => {
  return (dispatch) => {
    const timerId = setTimeout(() => {
      dispatch(removeNotification());
    }, timer * 1000);

    dispatch({
      type: 'NEW_NOTIFICATION',
      data: { message, id: timerId },
    });
  };
};

const removeNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

const notificationReducer = (
  state = { message: 'Welcome', id: null },
  action
) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      clearTimeout(state.id);
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return { message: null };
    default:
      return state;
  }
};

export default notificationReducer;

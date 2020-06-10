let timerId = null;

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      clearTimeout(timerId);
      return action.data;
    case 'CLEAR_NOTIFY':
      return null;
    default:
      return state;
  }
};

export const removeNotification = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_NOTIFY',
    });
  };
};

export const addNotification = (message, time, type = 'success') => {
  return (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      data: { message, type },
    });

    timerId = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default reducer;

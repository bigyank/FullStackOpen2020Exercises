import notificationReducer from './notificationReducer';

describe('notificationReducer', () => {
  test('returns state by default', () => {
    const action = {
      type: 'RANDOM',
    };

    const returnedState = notificationReducer(undefined, action);

    expect(returnedState).toBeNull();
  });

  test('returns appropriate message', () => {
    const action = {
      type: 'NEW_NOTIFICATION',
      message: 'TEST PASSS',
    };
    const message = notificationReducer(undefined, action);

    expect(message).toBe(action.message);
  });
});

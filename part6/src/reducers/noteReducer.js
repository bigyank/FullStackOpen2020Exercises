const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

export default noteReducer;

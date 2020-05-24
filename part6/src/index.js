import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import uniCafeReducer from './reducers/uniCafeReducer';

const store = createStore(uniCafeReducer);

const Button = ({ name, action }) => {
  return <button onClick={(e) => store.dispatch(action)}>{name}</button>;
};

const App = () => {
  return (
    <div>
      <div>
        <p>Good:{store.getState().good}</p>
        <p>Ok:{store.getState().ok}</p>
        <p>Bad:{store.getState().bad}</p>
      </div>
      <div>
        <Button name='good' action={{ type: 'GOOD' }} />
        <Button name='ok' action={{ type: 'OK' }} />
        <Button name='bad' action={{ type: 'BAD' }} />
      </div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

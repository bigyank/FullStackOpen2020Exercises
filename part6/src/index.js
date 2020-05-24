import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer);

const App = () => {
  return <h1>Hello World</h1>;
};

const renderDom = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderDom();

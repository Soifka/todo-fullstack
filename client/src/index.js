import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Counter from './Counter';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

const initialState = {
  counter: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COUNTER_PLUS':
      return {
        ...state,
        counter: state.counter + 1
      }
    case 'COUNTER_MINUS':
      return {
        ...state,
        counter: state.counter - 1
      }  
    default:
      return state;
  }
};

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    //<App />
    <Provider store={store}>
      <Counter />
    </Provider>
  //</React.StrictMode>
);

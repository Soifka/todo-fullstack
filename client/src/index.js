import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Counter from './Counter';
import { Provider } from 'react-redux';
import store from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    //<App />
    <Provider store={store}>
      <Counter />
    </Provider>
  //</React.StrictMode>
);

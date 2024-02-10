import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { clockReducer } from './store';

import ClockComponent from './containers/ClockComponent';
import './App.css';

const store = createStore(clockReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ClockComponent />
      </div>
    </Provider>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store'

import App from './App';
import './index.css';
import '@codewizard-dt/datetime-picker/datepicker.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

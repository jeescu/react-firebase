import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { messaging } from './firebase';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

messaging.onMessage(payload => {
  console.log(payload);
})

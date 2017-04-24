import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { messaging } from './firebase';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// logging our messaging notification
messaging.onMessage(payload => {
  console.log(payload);
})

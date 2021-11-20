import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from './App';
import { EmployeeAction } from './components';
import reportWebVitals from './reportWebVitals';

const RootApp = () => {
  return <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/employee/:id" component={EmployeeAction} />
    </Switch>
  </Router>
}

ReactDOM.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {UserListProvider} from "./contexts/userListContext";
import App from './App';

ReactDOM.render(
  <UserListProvider>
    <App/>
  </UserListProvider>,
  document.getElementById('root')
);

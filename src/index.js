import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from 'react-redux';
import { configStore } from './utils/configStore'
import {persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

axios.defaults.baseURL='http://localhost:8080';
axios.defaults.withCredentials=true;
const store = configStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>  
    <PersistGate persistor={persistor}>
        <App />
    </PersistGate>    
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

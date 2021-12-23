import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from 'react-redux';
import { configStore } from './utils/configStore'
import { QueryClient, QueryClientProvider} from 'react-query';
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";


const GlobalStyle = createGlobalStyle`
  ${normalize}
  body,html {
    padding:0;
    margin:0;
    height: 100%;
    width: 100%;
  }
`;

const queryClient = new QueryClient();

axios.defaults.baseURL='http://localhost:8080';
axios.defaults.withCredentials=true;

ReactDOM.render(
  <Provider store={configStore()}>  
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

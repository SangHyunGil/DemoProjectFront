import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { Provider } from "react-redux";
import { configStore } from "./utils/configStore";
import { QueryClient, QueryClientProvider } from "react-query";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import "./Assets/css/fonts.css";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "OTWelcomeBA";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/OTWelcomeBA.woff2")
          format("woff2");
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
          font-family: 'NEXON Lv2 Gothic';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff') format('woff');
          font-weight: normal;
          font-style: normal;
      }
      @font-face {
          font-family: 'SEBANG_Gothic_Bold';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SEBANG_Gothic_Bold.woff') format('woff');
          font-weight: normal;
          font-style: normal;
      }
      @font-face {
        font-family: 'ROKABold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.1/ROKABold.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
  ${normalize}
  body,html {
    padding:0;
    margin:0;
    height: auto;
    width: 100%;
    min-height: 100vh;
    #root {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      #main-content {
        flex: 1;
        position: relative;
        p {
          font-family: 'Galmuri9', sans-serif;
        }
      }
      font-family: 'SEBANG_Gothic_Bold', sans-serif;
    }
  }
  h1,h2,h3,h4,h5,h6,p {
    margin:0;
    padding: 0;
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

axios.defaults.baseURL = "https://koner.kr";
axios.defaults.withCredentials = true;

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

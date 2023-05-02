import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './stores';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { EtherContextProvider } from './contexts/ether';
import { ApiContextProvider } from './contexts/api';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <EtherContextProvider>
      <ApiContextProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
      </ApiContextProvider>
    </EtherContextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

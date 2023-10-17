import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/global.css';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { App } from './App';

import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Montserrat',
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,

);

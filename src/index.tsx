import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/global.css';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import { App } from './App';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <Provider store={store}>
      <App />
    </Provider>
  </SkeletonTheme>,
);

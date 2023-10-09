// New index create for React version 18++ if we use below this version use above code instead 
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';




const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    // <Provider store={store} >
      <App/>
    // </Provider>
  // </React.StrictMode>
)
serviceWorker.unregister();
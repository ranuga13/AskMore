import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Provider store={store}>

      <App mode="modal" redirectUrl="/app" />

    </Provider>
    </ClerkProvider>
  </React.StrictMode>
)

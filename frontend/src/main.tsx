import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './assets/scss/index.scss'
import { store } from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

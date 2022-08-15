import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import { BrowserRouter } from 'react-router-dom'
import './app/layout/styles.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

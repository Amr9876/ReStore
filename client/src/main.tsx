import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import { unstable_HistoryRouter as Router } from 'react-router-dom'
import './app/layout/styles.css'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import { unstable_HistoryRouter as Router } from 'react-router-dom'
import './app/layout/styles.css'
import { createBrowserHistory } from 'history'
import { StoreProvider } from './app/context/StoreContext'

export const history = createBrowserHistory()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router history={history}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>
)

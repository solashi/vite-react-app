import { Provider } from 'jotai'
import React from 'react'
import ReactDOM from 'react-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from 'routers'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Provider>
        <App />
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

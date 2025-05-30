import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, router } from './router'
import './styles/index.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { Provider } from 'urql'
import { urqlClient } from './lib/urqlClient'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="tomato" grayColor="olive" radius="small">
      <Provider value={urqlClient}>
        <RouterProvider router={router} />
      </Provider>
    </Theme>
  </React.StrictMode>,
) 
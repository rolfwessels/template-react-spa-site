import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, router } from './router'
import './styles/index.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './lib/apolloClient'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="tomato" grayColor="olive" radius="small">
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </Theme>
  </React.StrictMode>,
) 
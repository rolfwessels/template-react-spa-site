import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Theme accentColor="tomato" grayColor="olive" radius="small">
     */}
    <Theme accentColor="iris" grayColor="olive" radius="small">  <App />
    </Theme>
  </React.StrictMode>,
) 
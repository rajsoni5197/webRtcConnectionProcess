import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { SocketContextProvider } from './SocketContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </StrictMode>
)

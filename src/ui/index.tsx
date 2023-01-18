import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router, RouterProvider, MessagesProvider } from '~/ui/lib'
import './style.css'

ReactDOM.createRoot(document.getElementById('react-page')).render(
  <React.StrictMode>
    <MessagesProvider>
      <RouterProvider>
        <Router />
      </RouterProvider>
    </MessagesProvider>
  </React.StrictMode>
)

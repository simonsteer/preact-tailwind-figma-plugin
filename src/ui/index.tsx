import { render } from 'preact'
import { Router, RouterProvider, MessagesProvider } from '~/ui/lib'
import './style.css'

render(
  <MessagesProvider>
    <RouterProvider>
      <Router />
    </RouterProvider>
  </MessagesProvider>,
  document.getElementById('react-page')
)

import { Router, RouterProvider, MessagesProvider } from '~/ui/lib'

export default function App() {
  return (
    <MessagesProvider>
      <RouterProvider>
        <Router />
      </RouterProvider>
    </MessagesProvider>
  )
}

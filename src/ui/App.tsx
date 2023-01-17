import { RouterProvider, MessagesProvider } from '~/ui/hooks'
import Routes from '~/ui/routes'

export default function App() {
  return (
    <MessagesProvider>
      <RouterProvider>
        <Routes />
      </RouterProvider>
    </MessagesProvider>
  )
}

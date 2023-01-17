import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { RouteData, RouteName, RouteLoaderArgs } from '~/shared/types/routes'
import { messageFromUI } from '~/ui/utils'
import { useMessages } from '~/ui/hooks'

const RouterContext = createContext<{
  route: RouteData | null
  routeTo: <R extends RouteName>(name: R, ...args: RouteLoaderArgs<R>) => void
}>(null)

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [route, setRoute] = useState<RouteData>(null)

  const messages = useMessages()
  useEffect(
    () =>
      messages.on('controller/routeTo', payload => {
        setRoute(payload)
      }),
    []
  )

  const routeTo = <R extends RouteName>(
    name: R,
    ...args: RouteLoaderArgs<R>
  ) => {
    messageFromUI({ type: 'ui/routeTo', payload: { name, args } })
  }

  return (
    <RouterContext.Provider
      value={useMemo(() => ({ route, routeTo }), [route])}
    >
      {children}
    </RouterContext.Provider>
  )
}

export const useRouter = () => useContext(RouterContext)

export const useRoute = () => useRouter().route

export const useRouteTo = () => {
  const router = useRouter()
  return useMemo(() => router.routeTo, [])
}

import { createContext, ComponentChildren } from 'preact'
import { useContext, useEffect, useMemo, useState } from 'preact/hooks'
import { RouteData, RouteName, RouteLoaderArgs } from '~/types/routes'
import { uiMessage } from '~/ui/lib'
import { useMessages } from '~/ui/lib'

const RouterContext = createContext<{
  route: RouteData | null
  routeTo: <R extends RouteName>(name: R, ...args: RouteLoaderArgs<R>) => void
}>(null)

export const RouterProvider = ({
  children,
}: {
  children: ComponentChildren
}) => {
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
    uiMessage({ type: 'ui/routeTo', payload: { name, args } })
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

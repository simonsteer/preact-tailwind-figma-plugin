import { useEffect } from 'preact/hooks'
import { RouteName } from '~/types'
import { useRouter } from '~/ui/lib'
import * as ROUTE_MAP from '~/ui/routes'

const DEFAULT_ROUTE: RouteName = 'About'

export function Router() {
  const { route, routeTo } = useRouter()

  useEffect(() => {
    routeTo(DEFAULT_ROUTE)
  }, [])

  if (!route) return null

  const RouteComponent = ROUTE_MAP[route.name]
  return <RouteComponent {...(route.data as any)} />
}

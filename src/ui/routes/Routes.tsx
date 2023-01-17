import { useEffect } from 'react'
import { RouteName } from '~/shared/types'
import { useRouter } from '~/ui/hooks'

import { About } from './About'
import { Home } from './Home'

const ROUTE_MAP = {
  About,
  Home,
}

const DEFAULT_ROUTE: RouteName = 'About'

export default function Routes() {
  const { route, routeTo } = useRouter()

  useEffect(() => {
    routeTo(DEFAULT_ROUTE)
  }, [])

  if (!route) return null

  const RouteComponent = ROUTE_MAP[route.name]

  return (
    <div className="animate-fade-in">
      <RouteComponent data={route.data as any} />
    </div>
  )
}

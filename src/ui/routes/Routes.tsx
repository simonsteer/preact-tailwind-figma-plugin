import { useEffect } from 'react'
import { useRouter } from '~/ui/hooks'

import { About } from './About'
import { Home } from './Home'

const ROUTE_MAP = {
  About,
  Home,
}

export default function Routes() {
  const { route, routeTo } = useRouter()

  useEffect(() => {
    routeTo('Home')
  }, [])

  if (route === null) {
    return <p className="p-4 font-bold text-sm">loading...</p>
  }

  const RouteComponent = ROUTE_MAP[route.name]
  return <RouteComponent data={route.data as any} />
}

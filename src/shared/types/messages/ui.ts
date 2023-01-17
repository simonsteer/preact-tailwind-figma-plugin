import {
  RouteName,
  RouteLoaderArgs,
  EndpointName,
  EndpointFnArgs,
} from '~/shared/types'

export type MessageFromUI = UIRouteTo | UIAPI | UISelection

export type UIRouteTo<R extends RouteName = RouteName> = {
  type: 'ui/routeTo'
  payload: { name: R; args: RouteLoaderArgs<R> }
}

export type UIAPI<E extends EndpointName = EndpointName> = {
  type: 'ui/api'
  payload: { name: E; args: EndpointFnArgs<E> }
}

export type UISelection = {
  type: 'ui/selection'
  payload: boolean
}

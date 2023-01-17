import { RouteName } from '~/shared/types'
import { RouteLoaderFnArgs } from '../routes'

export type MessageFromUI = UIRouteTo

export type UIRouteTo<R extends RouteName = RouteName> = {
  type: 'ui/routeTo'
  payload: { name: R; args: RouteLoaderFnArgs<R> }
}

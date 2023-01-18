import { RouteToPayload } from '~/types'
import { EndpointPayload } from '../api'

export type UIMessage = UIRouteTo | UIAPI | UISelection

export type UIRouteTo = {
  type: 'ui/routeTo'
  payload: RouteToPayload
}

export type UIAPI = {
  type: 'ui/api'
  payload: EndpointPayload
}

export type UISelection = {
  type: 'ui/selection'
  payload: { active: boolean; id: string }
}

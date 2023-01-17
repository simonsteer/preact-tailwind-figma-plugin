import { RouteData } from '~/shared/types'

export type MessageFromControllerType = MessageFromController['type']

export type MessageFromControllerPayload<T extends MessageFromControllerType> =
  (MessageFromController & { type: T })['payload']

export type MessageFromController = ControllerRouteTo

export type ControllerRouteTo = {
  type: 'controller/routeTo'
  payload: RouteData
}

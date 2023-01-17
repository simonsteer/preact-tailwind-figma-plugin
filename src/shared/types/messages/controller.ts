import { RouteData, EndpointData, SelectionData } from '~/shared/types'

export type MessageFromControllerType = keyof MessagesFromController

export type MessageFromControllerPayload<T extends MessageFromControllerType> =
  MessagesFromController[T]

export type MessageFromController = {
  [T in MessageFromControllerType]: {
    type: T
    payload: MessagesFromController[T]
  }
}[MessageFromControllerType]

export type MessagesFromController = {
  ['controller/routeTo']: RouteData
  ['controller/api']: EndpointData
  ['controller/selection']: SelectionData
}

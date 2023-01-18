import { RouteData, EndpointData, SelectionData } from '~/types'

export type ControllerMessageType = keyof MessagesFromController

export type ControllerMessagePayload<T extends ControllerMessageType> =
  MessagesFromController[T]

export type ControllerMessage = {
  [T in ControllerMessageType]: {
    type: T
    payload: MessagesFromController[T]
  }
}[ControllerMessageType]

export type MessagesFromController = {
  ['controller/routeTo']: RouteData
  ['controller/api']: EndpointData
  ['controller/selection']: SelectionData
}

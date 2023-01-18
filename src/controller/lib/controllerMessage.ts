import { ControllerMessage } from '~/types'

export function controllerMessage(message: ControllerMessage) {
  figma.ui.postMessage(message, { origin: '*' })
}

import { MessageFromController } from '~/shared/types'

export function messageFromController(message: MessageFromController) {
  figma.ui.postMessage(message, { origin: '*' })
}

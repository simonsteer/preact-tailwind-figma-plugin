import { MessageFromUI } from '~/shared/types'

export function messageFromUI(message: MessageFromUI) {
  parent.postMessage({ pluginMessage: message }, '*')
}

import { UIMessage } from '~/types'

export function uiMessage(message: UIMessage) {
  parent.postMessage({ pluginMessage: message }, '*')
}

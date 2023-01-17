import { MessageFromUI } from '~/shared/types'
import { handleAPI } from './handleAPI'
import { handleRouteTo } from './handleRouteTo'
import { handleSelection } from './handleSelection'

export const setupMessages = () => {
  figma.ui.onmessage = (message: MessageFromUI) => {
    switch (message.type) {
      case 'ui/selection':
        handleSelection(message)
        break
      case 'ui/api':
        handleAPI(message)
        break
      case 'ui/routeTo':
        handleRouteTo(message)
        break
      default:
        break
    }
  }
}

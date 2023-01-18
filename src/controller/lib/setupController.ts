import { UIMessage } from '~/types'
import { handleAPI } from './handleAPI'
import { handleRouteTo } from './handleRouteTo'
import { handleSelection } from './handleSelection'

export const setupController = () => {
  figma.ui.onmessage = (message: UIMessage) => {
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
  figma.showUI(__html__, { width: 480, height: 300 })
}

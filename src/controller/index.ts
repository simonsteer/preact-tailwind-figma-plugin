import { MessageFromUI } from '~/shared/types'
import LOADERS from '~/controller/loaders'
import { messageFromController } from '~/controller/utils'

figma.showUI(__html__, { width: 180, height: 220 })

figma.ui.onmessage = (message: MessageFromUI) => {
  switch (message.type) {
    case 'ui/routeTo':
      const { name, args } = message.payload
      messageFromController({
        type: 'controller/routeTo',
        payload: { name, data: LOADERS[name](...args) },
      })
      break
    default:
      break
  }
}

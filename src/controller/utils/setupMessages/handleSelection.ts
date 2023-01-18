import { messageFromController } from '~/controller/utils'
import { UISelection } from '~/shared/types'
import { serializeSceneNode } from '../serializeSceneNode'

let didSetupHandler = false
let ids: string[] = []

const onSelectionChange = () => {
  ids.forEach(id =>
    messageFromController({
      type: 'controller/selection',
      payload: {
        id,
        data: figma.currentPage.selection.map(serializeSceneNode),
      },
    })
  )
}

export const handleSelection = (message: UISelection) => {
  if (message.payload.active === true) {
    ids.push(message.payload.id)
    onSelectionChange()
    if (!didSetupHandler) {
      figma.on('selectionchange', onSelectionChange)
      didSetupHandler = true
    }
  } else {
    ids = ids.filter(id => id !== message.payload.id)
  }
}

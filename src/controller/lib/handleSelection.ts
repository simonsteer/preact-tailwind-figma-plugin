import { pick } from 'lodash'
import { UISelection } from '~/types'
import { controllerMessage } from '~/controller/lib'

let didSetupHandler = false
let ids: string[] = []

const onSelectionChange = () => {
  ids.forEach(id =>
    controllerMessage({
      type: 'controller/selection',
      payload: {
        id,
        data: figma.currentPage.selection.map(node =>
          pick(node, ['width', 'height', 'id', 'name'])
        ),
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

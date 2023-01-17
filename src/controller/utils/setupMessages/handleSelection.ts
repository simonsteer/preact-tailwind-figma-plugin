import { messageFromController, getSelection } from '~/controller/utils'
import { UISelection } from '~/shared/types'

const onSelectionChange = () => {
  messageFromController({
    type: 'controller/selection',
    payload: getSelection(),
  })
}

export const handleSelection = (message: UISelection) => {
  if (message.payload === true) {
    onSelectionChange()
    figma.on('selectionchange', onSelectionChange)
  } else {
    figma.off('selectionchange', onSelectionChange)
  }
}

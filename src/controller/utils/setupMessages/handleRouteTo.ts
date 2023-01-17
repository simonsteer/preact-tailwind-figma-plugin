import { UIRouteTo } from '~/shared/types'
import { messageFromController } from '~/controller/utils'
import LOADERS from '~/controller/loaders'

export const handleRouteTo = (message: UIRouteTo) => {
  const { name, args } = message.payload

  messageFromController({
    type: 'controller/routeTo',
    payload: { name, data: LOADERS[name](...args) },
  })
}

import { UIRouteTo } from '~/types'
import * as LOADERS from '~/controller/loaders'
import { controllerMessage } from '~/controller/lib'

export const handleRouteTo = (message: UIRouteTo) => {
  const { name, args } = message.payload

  controllerMessage({
    type: 'controller/routeTo',
    payload: {
      name,
      data: name in LOADERS ? LOADERS[name](...args) : {},
    },
  })
}

import { UIAPI } from '~/types'
import { controllerMessage } from '~/controller/lib'
import * as API from '~/controller/api'

export const handleAPI = (message: UIAPI) => {
  const { name, args } = message.payload

  controllerMessage({
    type: 'controller/api',
    payload: { name, data: API[name](...args) },
  })
}

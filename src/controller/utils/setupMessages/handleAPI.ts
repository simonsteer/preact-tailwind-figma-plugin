import { UIAPI } from '~/shared/types'
import { messageFromController } from '~/controller/utils'
import API from '~/controller/api'

export const handleAPI = (message: UIAPI) => {
  const { name, args } = message.payload

  messageFromController({
    type: 'controller/api',
    payload: { name, data: API[name](...args) },
  })
}

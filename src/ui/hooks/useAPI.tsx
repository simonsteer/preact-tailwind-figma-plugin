import { EndpointFnData, EndpointFnArgs, EndpointName } from '~/shared/types'
import { useMessages } from '~/ui/hooks'
import { messageFromUI } from '../utils'

export function useAPI() {
  const messages = useMessages()

  return <E extends EndpointName>(name: E, ...args: EndpointFnArgs<E>) =>
    new Promise<EndpointFnData<E>>(resolve => {
      const off = messages.on('controller/api', response => {
        if (response.name !== name) return
        off()
        resolve(response.data as EndpointFnData<E>)
      })
      messageFromUI({ type: 'ui/api', payload: { name, args } })
    })
}

import { useCallback } from 'preact/hooks'
import { EndpointFnData, EndpointFnArgs, EndpointName } from '~/types'
import { useMessages } from '~/ui/lib'
import { uiMessage } from '~/ui/lib'

export function useAPI() {
  const messages = useMessages()

  return useCallback(
    <E extends EndpointName>(name: E, ...args: EndpointFnArgs<E>) =>
      new Promise<EndpointFnData<E>>(resolve => {
        const off = messages.on('controller/api', response => {
          if (response.name === name) {
            off()
            resolve(response.data as EndpointFnData<E>)
          }
        })
        uiMessage({ type: 'ui/api', payload: { name, args } })
      }),
    []
  )
}

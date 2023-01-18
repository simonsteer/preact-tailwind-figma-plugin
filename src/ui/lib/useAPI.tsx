import { useCallback } from 'preact/hooks'
import {
  EndpointFnData,
  EndpointFnArgs,
  EndpointName,
  EndpointPayload,
} from '~/types'
import { useMessages } from '~/ui/lib'
import { uiMessage } from '~/ui/lib'

export function useAPI() {
  const messages = useMessages()

  return useCallback(
    <E extends EndpointName>(name: E, ...data: EndpointFnArgs<E>) =>
      new Promise<EndpointFnData<E>>(resolve => {
        const removeListener = messages.on('controller/api', response => {
          if (response.name === name) {
            removeListener()
            resolve(response.data as EndpointFnData<E>)
          }
        })
        uiMessage({
          type: 'ui/api',
          payload: { name, data } as EndpointPayload,
        })
      }),
    []
  )
}

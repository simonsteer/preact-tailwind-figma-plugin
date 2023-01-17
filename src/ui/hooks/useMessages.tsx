import { createContext, ReactNode, useContext, useEffect, useRef } from 'react'
import {
  MessageFromController,
  MessageFromControllerPayload,
  MessageFromControllerType,
} from '~/shared/types'

type OnMessageFn = <T extends MessageFromControllerType>(
  type: T,
  callback: (payload: MessageFromControllerPayload<T>) => void
) => () => void

const MessagesContext = createContext<{ on: OnMessageFn; once: OnMessageFn }>({
  on: () => () => {},
  once: () => () => {},
})

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const listeners = useRef<
    {
      [T in MessageFromControllerType]?: ((
        payload: MessageFromControllerPayload<T>
      ) => void)[]
    }
  >({})

  useEffect(() => {
    onmessage = message => {
      const data = message.data.pluginMessage as MessageFromController
      listeners.current[data.type]?.forEach(listener => listener(data.payload))
    }
    return () => {
      onmessage = () => {}
    }
  }, [])

  const on: OnMessageFn = (type, callback) => {
    if (!listeners.current[type]) listeners.current[type] = []

    listeners.current[type].push(callback)

    return () => {
      listeners.current[type] = listeners.current[type].filter(
        cb => cb !== callback
      ) as any
    }
  }

  const once: OnMessageFn = (type, callback) => {
    if (!listeners.current[type]) listeners.current[type] = []

    const wrappedCallback = (...args: Parameters<typeof callback>) => {
      callback(...args)
      listeners.current[type] = listeners.current[type].filter(
        cb => cb !== wrappedCallback
      ) as any
    }
    listeners.current[type].push(callback)

    return () => {
      listeners.current[type] = listeners.current[type].filter(
        cb => cb !== wrappedCallback
      ) as any
    }
  }

  return (
    <MessagesContext.Provider value={{ on, once }}>
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessages = () => useContext(MessagesContext)

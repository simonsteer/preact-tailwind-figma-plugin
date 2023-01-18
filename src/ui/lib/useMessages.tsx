import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import {
  ControllerMessage,
  ControllerMessagePayload,
  ControllerMessageType,
} from '~/types'

type OnMessageFn = <T extends ControllerMessageType>(
  type: T,
  callback: (payload: ControllerMessagePayload<T>) => void
) => () => void

const MessagesContext = createContext<{ on: OnMessageFn; once: OnMessageFn }>({
  on: () => () => {},
  once: () => () => {},
})

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const listeners = useRef<
    {
      [T in ControllerMessageType]?: ((
        payload: ControllerMessagePayload<T>
      ) => void)[]
    }
  >({})

  useEffect(() => {
    onmessage = message => {
      const data = message.data.pluginMessage as ControllerMessage
      listeners.current[data.type]?.forEach(listener => listener(data.payload))
    }
    return () => {
      onmessage = () => {}
    }
  }, [])

  const on: OnMessageFn = useCallback((type, callback) => {
    if (!listeners.current[type]) listeners.current[type] = []

    listeners.current[type].push(callback)

    return () => {
      listeners.current[type] = listeners.current[type].filter(
        cb => cb !== callback
      ) as any
    }
  }, [])

  const once: OnMessageFn = useCallback((type, callback) => {
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
  }, [])

  return (
    <MessagesContext.Provider value={useMemo(() => ({ on, once }), [])}>
      {children}
    </MessagesContext.Provider>
  )
}

export const useMessages = () => useContext(MessagesContext)

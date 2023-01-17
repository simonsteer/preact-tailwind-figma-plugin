import API from '~/controller/api'

export type EndpointName = keyof typeof API

export type EndpointFn<E extends EndpointName> = typeof API[E]

export type EndpointFnArgs<E extends EndpointName> = Parameters<EndpointFn<E>>

export type EndpointFnData<E extends EndpointName> = ReturnType<EndpointFn<E>>

export type EndpointData = {
  [E in EndpointName]: { name: E; data: ReturnType<EndpointFn<E>> }
}[EndpointName]

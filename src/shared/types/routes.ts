import { ComponentType } from 'react'
import LOADERS from '~/controller/loaders'

export type RouteName = keyof typeof LOADERS

export type RouteData = {
  [R in RouteName]: {
    name: R
    data: RouteLoaderData<R>
  }
}[RouteName]

export type RouteLoaderFnArgs<R extends RouteName> = Parameters<
  RouteLoaderFn<R>
>

export type RouteLoaderFn<R extends RouteName> = typeof LOADERS[R]

export type RouteLoaderData<R extends RouteName> = ReturnType<typeof LOADERS[R]>

export type RouteComponent<R extends RouteName> = ComponentType<{
  data: RouteLoaderData<R>
}>

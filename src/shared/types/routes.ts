import { ComponentType } from 'react'
import LOADERS from '~/controller/loaders'

export type RouteName = keyof typeof LOADERS

export type RouteData = {
  [R in RouteName]: {
    name: R
    data: RouteLoaderData<R>
  }
}[RouteName]

export type RouteLoader<R extends RouteName> = typeof LOADERS[R]

export type RouteLoaderArgs<R extends RouteName> = Parameters<RouteLoader<R>>

export type RouteLoaderData<R extends RouteName> = ReturnType<RouteLoader<R>>

export type RouteComponent<R extends RouteName> = ComponentType<{
  data: RouteLoaderData<R>
}>

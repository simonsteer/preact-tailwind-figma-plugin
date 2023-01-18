import * as ROUTES from '~/ui/routes'
import * as LOADERS from '~/controller/loaders'
import { ComponentType } from 'preact'

export type LoaderName = keyof typeof LOADERS

export type RouteName = keyof typeof ROUTES

export type RouteData = {
  [R in RouteName]: {
    name: R
    data: RouteLoaderData<R>
  }
}[RouteName]

export type RouteLoader<R extends RouteName> = R extends LoaderName
  ? typeof LOADERS[R]
  : () => {}

export type RouteLoaderArgs<R extends RouteName> = Parameters<RouteLoader<R>>

export type RouteLoaderData<R extends RouteName> = ReturnType<RouteLoader<R>>

export type RouteComponent<R extends RouteName> = ComponentType<
  RouteLoaderData<R>
>

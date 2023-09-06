import { RouteObject } from 'react-router-dom'

/**
 * Creates a route alias, which is a route that contains all the {@param aliasedRoutes}, making them
 * available at the {@param alias} path.
 *
 * A certain structure is expected of the aliased routes:
 * - They must have a path
 * - The path must start with a /
 *
 * @param alias
 * @param aliasedRoutes
 */
export function createRouteAlias(
  alias: string,
  aliasedRoutes: ReadonlyArray<RouteObject>,
): RouteObject {
  return {
    path: alias,
    children: aliasedRoutes.map((it) => {
      if (!it.path) {
        throw Error(`Route ${it} has no path`)
      }
      if (!it.path.startsWith('/')) {
        throw Error(`Route ${it} path ${it.path} expected to start with /`)
      }
      return {
        ...it,
        path: it.path.slice(1),
      }
    }),
  }
}
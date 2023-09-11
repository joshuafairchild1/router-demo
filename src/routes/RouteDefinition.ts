import { ComponentType, createElement, ReactElement } from 'react'

import { RouteProps } from './RouteProps'

export class RouteDefinition {

  readonly Component: ComponentType

  constructor(
    /**
     * The path that this route is available at.
     */
    readonly path: string,
    /**
     * The component that renders at this route.
     */
    Component: ComponentType<RouteProps>,
    /**
     * The component that renders when an error occurs while rendering this route.
     */
    readonly errorElement: ReactElement | null = null,
  ) {
    this.Component = withRoute(Component, this)
  }
}

/**
 * Wraps the provided component, making {@param route} available via props.
 * @param Component The component to inject the route to
 * @param route The route to inject via props
 */
function withRoute(
  Component: ComponentType<RouteProps>,
  route: RouteDefinition,
): ComponentType {
  const Wrapped = function() {
    return createElement(Component, { route })
  }
  Wrapped.displayName = `withRoute(${Component.displayName || Component.name})`
  return Wrapped
}
import { RouteDefinition } from './RouteDefinition'

export class Breadcrumb {
  constructor(
    readonly label: string,
    readonly route: RouteDefinition,
    readonly parent: RouteDefinition | null = null,
  ) {}
}

const byRoute: Map<RouteDefinition, Breadcrumb> = new Map()

/*
TODO: on breadcrumbs,
 1. First iteration tied the breadcrumb definition to the route itself. In the spirit of separation
    of concerns, moved it to this separate breadcrumb-specific file
 2. Second iteration, had to expose this function to avoid a circular dependency,
    because `routes.ts` needs to import all the top-level components, which all use the `Breadcrumb`
    component, which imports to this file, which _previously_ imported `routes.ts`
 3. Basically, feels like there's something wrong here...
 4. More stuff: the breadcrumb label needs to be dynamic (e.g. show workspace name in breadcrumb).
    Could solve this via some "label resolver" that's optionally passed into the breadcrumb component
 5. Up until now, I had considered the "subviews" for "Admin Settings" to be query param based (see sitemap),
    but the mockup indicates breadcrumbs for the sub-view. Compare this with workspace sub-views where the
    breadcrumb does not depend on the sub-view. Seems to imply that for "Admin Settings" the sub-views are
    actually separate routes, not query params.
 */
export function setUpBreadcrumbs(routes: Record<string, RouteDefinition>) {
  const breadcrumbs = [
    new Breadcrumb(
      'Plans',
      routes.plans,
    ),
    new Breadcrumb(
      'Plan',
      routes.planDetail,
      routes.plans,
    ),
    new Breadcrumb(
      'Templates',
      routes.templates,
    ),
    new Breadcrumb(
      'Template',
      routes.templateDetail,
      routes.templates,
    )
  ]
  breadcrumbs.forEach((breadcrumb) => {
    byRoute.set(breadcrumb.route, breadcrumb)
  })
}

export function breadcrumbForRoute(route: RouteDefinition): Breadcrumb | null {
  return byRoute.get(route) || null
}
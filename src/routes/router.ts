import { PlanDashboardScreen } from '../screen/PlanDashboardScreen'
import { ErrorPage } from '../ErrorPage'
import { TemplateDashboardScreen } from '../screen/TemplateDashboardScreen'
import { PlanDetailScreen } from '../screen/PlanDetailScreen'
import { TemplateDetailScreen } from '../screen/TemplateDetailScreen'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { ComponentType, createElement, ReactElement } from 'react'
import _ from 'lodash'
import { createRouteAlias } from './createRouteAlias'

export type RouteName = keyof typeof routes

export class RouteDefinition {
  constructor(
    /**
     * The path that this route is available at.
     */
    readonly path: string,
    /**
     * Human-readable label used to identify this route in a breadcrumb UI.
     *
     * TODO: explore externalizing this and {@link parent} into a separate "breadcrumb hierarchy"
     *  constant, because breadcrumbs technically follow their own hierarchy (right?).
     */
    readonly breadcrumbLabel: string,
    /**
     * The component that renders at this route.
     */
    readonly Component: ComponentType,
    /**
     * The route that this route is a child of. This is used to construct a breadcrumb UI.
     */
    readonly parent: RouteDefinition | null = null,
    /**
     * The component that renders when an error occurs while rendering this route.
     */
    readonly errorElement: ReactElement | null = null,
  ) {
  }
}

const plansRoute = new RouteDefinition(
  '/',
  'Plans',
  PlanDashboardScreen,
  null,
  createElement(ErrorPage),
)

const templatesRoute = new RouteDefinition(
  '/template',
  'Templates',
  TemplateDashboardScreen,
)

const templateDetailRoute = new RouteDefinition(
  '/template/:templateId',
  'Template',
  TemplateDetailScreen,
  templatesRoute,
)

const planDetailRoute = new RouteDefinition(
  '/plan/:planId',
  'Plan',
  PlanDetailScreen,
  plansRoute,
)

export const routes = {
  plans: plansRoute,
  templates: templatesRoute,
  planDetail: planDetailRoute,
  templateDetail: templateDetailRoute,
} satisfies Record<string, RouteDefinition>

const allAlignRoutes = _.values(routes).map(forReactRouter)

export const router = createBrowserRouter([
  ...allAlignRoutes,
  createRouteAlias('/align', allAlignRoutes),
])

function forReactRouter(route: RouteDefinition): RouteObject {
  return _.pick(route, ['path', 'Component', 'errorElement'])
}
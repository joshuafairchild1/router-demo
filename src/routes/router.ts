import { PlanDashboardScreen } from '../screen/PlanDashboardScreen'
import { ErrorPage } from '../ErrorPage'
import { TemplateDashboardScreen } from '../screen/TemplateDashboardScreen'
import { PlanDetailScreen } from '../screen/PlanDetailScreen'
import { TemplateDetailScreen } from '../screen/TemplateDetailScreen'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import _ from 'lodash'
import { createRouteAlias } from './createRouteAlias'

export type RouteName = keyof typeof routes

// TODO: this into a class that exists independently of RouteObject, and have a method or some
//  other function that converts from a `RouteDefinition` to a `RouteObject`.
//  Decoupling our implementation from the react-router-dom implementation seems like a good idea in general.
export type RouteDefinition =
  // making `path` and `Component` required for our implementation, and omitting `element` (we can adjust this if
  // we find a use case for `element`)
  Omit<RouteObject, 'path' | 'Component' | 'element'>
  & Required<Pick<RouteObject, 'path' | 'Component'>>
  & {
    /**
     * Human-readable label used to identify this route in a breadcrumb UI.
     */
    breadcrumbLabel: string
    /**
     * Names of panels that are supported by this route.
     */
    supportedPanels?: ReadonlyArray<string>
    /**
     * The route that this route is a child of. This can be used to construct a breadcrumb UI..
     */
    parent?: RouteDefinition
  }

const plansRoute = {
  path: '/',
  breadcrumbLabel: 'Plans',
  Component: PlanDashboardScreen,
  errorElement: createElement(ErrorPage),
}

const templatesRoute = {
  path: '/template',
  breadcrumbLabel: 'Templates',
  Component: TemplateDashboardScreen,
}

const templateDetailRoute = {
  path: '/template/:templateId',
  breadcrumbLabel: 'Template',
  Component: TemplateDetailScreen,
  supportedPanels: ['milestone'],
  parent: templatesRoute,
}

const planDetailRoute = {
  path: '/plan/:planId',
  breadcrumbLabel: 'Plan',
  Component: PlanDetailScreen,
  supportedPanels: ['milestone', 'profile'],
  parent: plansRoute,
}

export const routes = {
  plans: plansRoute,
  templates: templatesRoute,
  planDetail: planDetailRoute,
  templateDetail: templateDetailRoute,
} satisfies Record<string, RouteDefinition>

const allAlignRoutes = _.values(routes)

export const router = createBrowserRouter([
  ...allAlignRoutes,
  createRouteAlias('/align', allAlignRoutes)
])
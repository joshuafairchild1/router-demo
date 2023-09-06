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

// TODO: another idea: turn this into a class that exists independently of RouteObject, and have a method or some
//  other function that converts from a RouteDefinition to a RouteObject
export type RouteDefinition =
  // making `path` and `Component` required for our implementation, and omitting `element` (we can adjust this if
  // we find a use case for `element`)
  Omit<RouteObject, 'path' | 'Component' | 'element'>
  & Required<Pick<RouteObject, 'path' | 'Component'>>
  & {
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
  Component: PlanDashboardScreen,
  errorElement: createElement(ErrorPage),
}

const templatesRoute = {
  path: '/template',
  Component: TemplateDashboardScreen,
}

const planDetailRoute = {
  path: '/plan/:planId',
  Component: PlanDetailScreen,
  supportedPanels: ['milestone', 'profile'],
  parent: plansRoute,
}

const templateDetailRoute = {
  path: '/template/:templateId',
  Component: TemplateDetailScreen,
  supportedPanels: ['milestone'],
  parent: templatesRoute,
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
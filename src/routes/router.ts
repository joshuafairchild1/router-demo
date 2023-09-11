import { PlanDashboardScreen } from '../screen/PlanDashboardScreen'
import { ErrorPage } from '../ErrorPage'
import { TemplateDashboardScreen } from '../screen/TemplateDashboardScreen'
import { PlanDetailScreen } from '../screen/PlanDetailScreen'
import { TemplateDetailScreen } from '../screen/TemplateDetailScreen'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import _ from 'lodash'
import { createRouteAlias } from './createRouteAlias'
import { RouteDefinition } from './RouteDefinition'

export type RouteName = keyof typeof routes

const plansRoute = new RouteDefinition(
  '/',
  PlanDashboardScreen,
  createElement(ErrorPage),
)

const templatesRoute = new RouteDefinition(
  '/template',
  TemplateDashboardScreen,
)

const templateDetailRoute = new RouteDefinition(
  '/template/:templateId',
  TemplateDetailScreen,
)

const planDetailRoute = new RouteDefinition(
  '/plan/:planId',
  PlanDetailScreen,
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
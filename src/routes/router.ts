import { PlanDashboardScreen } from '../screen/PlanDashboardScreen'
import { ErrorPage } from '../ErrorPage'
import { TemplateDashboardScreen } from '../screen/TemplateDashboardScreen'
import { PlanDetailScreen } from '../screen/PlanDetailScreen'
import { TemplateDetailScreen } from '../screen/TemplateDetailScreen'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { createElement } from 'react'
import _ from 'lodash'
import { createRouteAlias } from './createRouteAlias'

export type RouteName = keyof typeof routeDefinitionsLookup

const routeDefinitionsLookup = {
  plans: {
    path: '/',
    Component: PlanDashboardScreen,
    errorElement: createElement(ErrorPage),
  },
  templates: {
    path: '/template',
    Component: TemplateDashboardScreen,
  },
  planDetail: {
    path: '/plan/:planId',
    Component: PlanDetailScreen,
  },
  templateDetail: {
    path: '/template/:templateId',
    Component: TemplateDetailScreen,
  },
} satisfies Record<string, RouteObject>

const allAlignRoutes = _.values(routeDefinitionsLookup)

export const router = createBrowserRouter([
  ...allAlignRoutes,
  createRouteAlias('/align', allAlignRoutes)
])
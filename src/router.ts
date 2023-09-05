import { PlanDashboardScreen } from './screen/PlanDashboardScreen'
import { ErrorPage } from './ErrorPage'
import { TemplateDashboardScreen } from './screen/TemplateDashboardScreen'
import { PlanDetailScreen } from './screen/PlanDetailScreen'
import { TemplateDetailScreen } from './screen/TemplateDetailScreen'
import { createBrowserRouter } from 'react-router-dom'
import { createElement } from 'react'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PlanDashboardScreen,
    errorElement: createElement(ErrorPage),
  },
  {
    path: '/template',
    Component: TemplateDashboardScreen,
  },
  {
    path: '/plan/:planId',
    Component: PlanDetailScreen,
  },
  {
    path: '/template/:templateId',
    Component: TemplateDetailScreen,
  },
])
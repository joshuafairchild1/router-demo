import { RouteName } from './router'

export const planViews = [
  'home',
  'activity',
  'team',
  'timeline',
  'assets',
  'reporting',
  'mutualBusinessObjectives',
  'calls',
] as const
export type PlanView = (typeof planViews)[number]

const milestoneViews = [ 'actions', 'people', 'comments', 'assets' ] as const
export type MilestoneView = (typeof milestoneViews)[number]

export const profileViews = [ 'profile', 'notifications' ] as const
export type ProfileView = (typeof profileViews)[number]

type PanelQueryParams<T extends string> = {
  panel: T
}

// TODO: devise a way to support multiple panels
//  Two ideas:
//  1. Use a comma-separated list of open panel names
//  2. Each panel name is a unique key in the query params
type PlanQueryParams = PanelQueryParams<MilestoneView | ProfileView> & {
  planView: PlanView
}

type TemplateQueryParams = PanelQueryParams<MilestoneView> & {
  templateView: PlanView
}

/**
 * Determines the type of query parameters for a given route name
 */
type QueryParams<Name extends RouteName> = {
  plans: never
  templates: never
  planDetail: PlanQueryParams
  templateDetail: TemplateQueryParams
}[Name]
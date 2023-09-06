import { RouteDefinition } from '../routes/router'

export type ScreenProps<T extends RouteDefinition> = {
  route: T
}
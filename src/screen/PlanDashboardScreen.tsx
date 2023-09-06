import { DefaultApplicationScreen } from './DefaultApplicationScreen'
import { Link } from 'react-router-dom'
import React from 'react'
import { routes } from '../routes/router'

export function PlanDashboardScreen() {
  return <DefaultApplicationScreen
    route={routes.plans}
    main={<div>
      <p><Link to="/plan/1">Plan 1</Link></p>
      <p><Link to="/plan/2">Plan 2</Link></p>
      <p><Link to="/plan/3">Plan 3</Link></p>
    </div>}
  />
}
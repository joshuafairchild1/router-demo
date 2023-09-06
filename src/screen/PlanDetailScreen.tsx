import { useParams } from 'react-router-dom'
import { DefaultApplicationScreen } from './DefaultApplicationScreen'
import React from 'react'
import { routes } from '../routes/router'

export function PlanDetailScreen() {
  const params = useParams()
  return <DefaultApplicationScreen
    route={routes.planDetail}
    main={<div>
      <p>Plan Detail</p>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>}
    sidePanelContent={<p>Plan Detail Side Panel</p>}
  />
}
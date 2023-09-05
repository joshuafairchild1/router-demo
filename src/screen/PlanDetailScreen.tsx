import { useParams } from 'react-router-dom'
import { DefaultApplicationScreen } from './DefaultApplicationScreen'
import React from 'react'

export function PlanDetailScreen() {
  const params = useParams()
  return <DefaultApplicationScreen
    main={<div>
      <p>Plan Detail</p>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>}
    sidePanel={<div>
      <p>Plan Detail Side Panel</p>
    </div>}
  />
}
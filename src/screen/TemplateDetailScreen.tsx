import { useParams } from 'react-router-dom'
import { DefaultApplicationScreen } from './DefaultApplicationScreen'
import React from 'react'

export function TemplateDetailScreen() {
  const params = useParams()
  return <DefaultApplicationScreen
    main={<div>
      <p>Template Detail</p>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>}
    sidePanel={<div>
      <p>Template Detail Panel</p>
    </div>}
  />
}
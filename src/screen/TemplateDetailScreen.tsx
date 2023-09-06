import { useParams } from 'react-router-dom'
import { DefaultApplicationScreen } from './DefaultApplicationScreen'
import React from 'react'
import { routes } from '../routes/router'

export function TemplateDetailScreen() {
  const params = useParams()
  return <DefaultApplicationScreen
    route={routes.templateDetail}
    main={<div>
      <p>Template Detail</p>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>}
    sidePanelContent={<p>Template Detail Panel</p>}
  />
}
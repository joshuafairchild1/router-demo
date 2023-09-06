import { DefaultApplicationScreen } from './DefaultApplicationScreen'
import { Link } from 'react-router-dom'
import React from 'react'
import { routes } from '../routes/router'

export function TemplateDashboardScreen() {
  return <DefaultApplicationScreen
    route={routes.templates}
    main={<div>
      <p><Link to="/template/1">Template 1</Link></p>
      <p><Link to="/template/2">Template 2</Link></p>
      <p><Link to="/template/3">Template 3</Link></p>
    </div>}
    navigation={<div>
      <p>Custom Template Navigation Bar!</p>
      <Link to="/">Home</Link>
    </div>}
  />
}
import { RouteDefinition } from '../routes/router'
import { Link } from 'react-router-dom'
import React from 'react'

type Props = {
  route: RouteDefinition
}

export function SimpleBreadcrumbs(props: Props) {
  const { route: { parent } } = props
  if (!parent) {
    return null
  }
  return <>
    &nbsp;|&nbsp;
    <Link to={parent.path}>
      {parent.breadcrumbLabel}
    </Link>
    {parent.parent && <SimpleBreadcrumbs route={parent.parent}/>}
  </>
}
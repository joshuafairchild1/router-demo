import { Link } from 'react-router-dom'
import React from 'react'
import { Breadcrumb, breadcrumbForRoute } from '../routes/breadcrumbs'
import { RouteDefinition } from '../routes/RouteDefinition'

type Props = {
  route: RouteDefinition
}

export function SimpleBreadcrumbs(props: Props) {
  const breadcrumb = breadcrumbForRoute(props.route)
  if (!breadcrumb) {
    return null
  }
  const parentBreadcrumb = breadcrumb.parent && breadcrumbForRoute(breadcrumb.parent)
  return <>
    {parentBreadcrumb && <NextBreadcrumb breadcrumb={parentBreadcrumb}/>}
    <span>{breadcrumb.label}</span>
  </>
}

function NextBreadcrumb(props: { breadcrumb: Breadcrumb }) {
  const { breadcrumb } = props
  const parentBreadcrumb = breadcrumb.parent && breadcrumbForRoute(breadcrumb.parent)

  return <>
    {parentBreadcrumb && <NextBreadcrumb breadcrumb={parentBreadcrumb}/>}
    <Link to={breadcrumb.route.path}>
      {breadcrumb.label}
    </Link>
    &nbsp;
    {'>'}
    &nbsp;
  </>
}
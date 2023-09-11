import { Link } from 'react-router-dom'
import React from 'react'
import { DefaultLayout } from '../layout/DefaultLayout'
import { NavigationBar, NavigationControl, SiteControl } from '../layout/NavigationBar'
import { DefaultNavigationContent } from '../nav/DefaultNavigationContent'
import { useSidebarNav } from '../nav/useSidebarNav'
import { SimpleBreadcrumbs } from '../nav/SimpleBreadcrumbs'
import { RouteProps } from '../routes/RouteProps'

export function PlanDashboardScreen(props: RouteProps) {
  const [sidebarNavOpen, setSidebarNavOpen] = useSidebarNav()

  return <DefaultLayout
    main={
      <div>
        <p><Link to="/plan/1">Plan 1</Link></p>
        <p><Link to="/plan/2">Plan 2</Link></p>
        <p><Link to="/plan/3">Plan 3</Link></p>
      </div>
    }
    isNavOpen={sidebarNavOpen}
    navigation={{
      content: <NavigationBar>
        <DefaultNavigationContent/>
      </NavigationBar>,
      siteControl: <SiteControl/>,
      navigationControl: <NavigationControl expanded={sidebarNavOpen} toggle={setSidebarNavOpen}/>,
    }}
    sidePanelIsOpen={false}
    header={<SimpleBreadcrumbs route={props.route}/>}
    footer={<div>App footer</div>}
    siteNotice={<div>Site notice</div>}
  />
}
import { Link } from 'react-router-dom'
import React from 'react'
import { DefaultLayout } from '../layout/DefaultLayout'
import { NavigationBar, NavigationControl, SiteControl } from '../layout/NavigationBar'
import { SimpleBreadcrumbs } from '../nav/SimpleBreadcrumbs'
import { useSidebarNav } from '../nav/useSidebarNav'
import { routes } from '../routes/router'

export function TemplateDashboardScreen() {
  const [sidebarNavOpen, setSidebarNavOpen] = useSidebarNav()

  return <DefaultLayout
    main={
      <div>
        <p><Link to="/template/1">Template 1</Link></p>
        <p><Link to="/template/2">Template 2</Link></p>
        <p><Link to="/template/3">Template 3</Link></p>
      </div>
    }
    isNavOpen={sidebarNavOpen}
    navigation={{
      content: <NavigationBar>
        <div>
          <p>Custom Template Navigation Bar!</p>
          <Link to="/">Home</Link>
        </div>
      </NavigationBar>,
      siteControl: <SiteControl/>,
      navigationControl: <NavigationControl expanded={sidebarNavOpen} toggle={setSidebarNavOpen}/>,
    }}
    sidePanelIsOpen={false}
    header={<div>
      App header
      <SimpleBreadcrumbs route={routes.templates}/>
    </div>}
    footer={<div>App footer</div>}
    siteNotice={<div>Site notice</div>}
  />
}
import { Link, useLocation, useParams } from 'react-router-dom'
import React from 'react'
import { DefaultLayout } from '../layout/DefaultLayout'
import { NavigationBar, NavigationControl, SiteControl } from '../layout/NavigationBar'
import { DefaultNavigationContent } from '../nav/DefaultNavigationContent'
import { SidePanel } from '../layout/SidePanel'
import { useSidebarNav } from '../nav/useSidebarNav'
import { QUERY_PARAM_PANEL, useSidePanelBehavior } from './useSidePanelBehavior'
import { SimpleBreadcrumbs } from '../nav/SimpleBreadcrumbs'
import { RouteProps } from '../routes/RouteProps'

const sidePanelNames = ['milestone'] as const

export function TemplateDetailScreen(props: RouteProps) {
  const params = useParams()
  const location = useLocation()
  const [sidebarNavOpen, setSidebarNavOpen] = useSidebarNav()
  const sidePanel = useSidePanelBehavior(sidePanelNames)

  return <DefaultLayout
    main={
      <div>
        <p>Template Detail</p>
        <pre>{JSON.stringify(params, null, 2)}</pre>
        {sidePanelNames.map((name) => {
          const searchParams = new URLSearchParams(location.search)
          searchParams.delete(QUERY_PARAM_PANEL)
          searchParams.append(QUERY_PARAM_PANEL, name)
          return <p key={name}>
            <Link to={`${location.pathname}?${searchParams}`}>
              Open {name} side panel
            </Link>
          </p>
        })}
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
    sidePanelIsOpen={sidePanel.hasSidePanel}
    sidePanel={
      sidePanel.openSidePanelName &&
        <SidePanel sidePanelIsOpen={sidePanel.hasSidePanel} closeSidePanel={sidePanel.closeSidePanel}>
            <p>Template Detail Panel</p>
        </SidePanel>}
    header={<SimpleBreadcrumbs route={props.route}/>}
    footer={<div>App footer</div>}
    siteNotice={<div>Site notice</div>}
  />
}
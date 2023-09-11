import { Link, useLocation, useParams } from 'react-router-dom'
import React, { ReactElement } from 'react'
import { routes } from '../routes/router'
import { NavigationBar, NavigationControl, SiteControl } from '../layout/NavigationBar'
import { SidePanel } from '../layout/SidePanel'
import { DefaultLayout } from '../layout/DefaultLayout'
import { useSidebarNav } from '../nav/useSidebarNav'
import { DefaultNavigationContent } from '../nav/DefaultNavigationContent'
import { SimpleBreadcrumbs } from '../nav/SimpleBreadcrumbs'
import { useSidePanelBehavior } from './useSidePanelBehavior'

const sidePanelNames = ['profile', 'milestone', 'edit', 'share'] as const

type SidePanelName = typeof sidePanelNames[number]

export function PlanDetailScreen() {
  const params = useParams()
  const location = useLocation()
  const [sidebarNavOpen, setSidebarNavOpen] = useSidebarNav()
  const sidePanel = useSidePanelBehavior(sidePanelNames)

  return <DefaultLayout
    main={
      <div>
        <p>Plan Detail</p>
        <pre>{JSON.stringify(params, null, 2)}</pre>
        {sidePanelNames.map((name) => {
          const searchParams = new URLSearchParams(location.search)
          searchParams.delete('panel')
          searchParams.append('panel', name)
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
    sidePanel={sidePanel.openSidePanelName &&
        <SidePanel sidePanelIsOpen={sidePanel.hasSidePanel} closeSidePanel={sidePanel.closeSidePanel}>
            <p>Plan Detail Side Panel</p>
            <div>{selectSidePanelContent(sidePanel.openSidePanelName)}</div>
        </SidePanel>}
    header={<div>
      App Header
      <SimpleBreadcrumbs route={routes.planDetail}/>
    </div>}
    footer={<div>App footer</div>}
    siteNotice={<div>Site notice</div>}
  />
}

function selectSidePanelContent(name: SidePanelName): ReactElement {
  switch (name) {
    case 'profile':
      return <div>Profile</div>
    case 'milestone':
      return <div>Milestone</div>
    case 'edit':
      return <div>Edit</div>
    case 'share':
      return <div>Share</div>
  }
}
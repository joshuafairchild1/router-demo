import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import React, { ReactElement, useCallback, useMemo } from 'react'
import { routes } from '../routes/router'
import { NavigationBar, NavigationControl, SiteControl } from '../layout/NavigationBar'
import { SidePanel } from '../layout/SidePanel'
import { DefaultLayout } from '../layout/DefaultLayout'
import { useSidebarNav } from '../nav/useSidebarNav'
import { DefaultNavigationContent } from '../nav/DefaultNavigationContent'
import { SimpleBreadcrumbs } from '../nav/SimpleBreadcrumbs'

const sidePanelNames = ['profile', 'milestone', 'edit', 'share'] as const

type SidePanelName = typeof sidePanelNames[number]

export function PlanDetailScreen() {
  const params = useParams()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sidebarNavOpen, setSidebarNavOpen] = useSidebarNav()
  const openSidePanelName = useMemo(function computeOpenPanel() {
    return sidePanelNames.find((name) => searchParams.get('panel') === name) || null
  }, [searchParams])
  const hasSidePanel = !!openSidePanelName
  const closeSidePanel = useCallback(function closeSidePanel() {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      next.delete('panel')
      return next
    })
  }, [setSearchParams])

  return <DefaultLayout
    main={
      <div>
        <p>Plan Detail</p>
        <pre>{JSON.stringify(params, null, 2)}</pre>
        {sidePanelNames.map((name) => {
          const searchParams = new URLSearchParams(location.search)
          searchParams.delete('panel')
          searchParams.append('panel', name)
          return <p>
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
    sidePanelIsOpen={hasSidePanel}
    sidePanel={openSidePanelName &&
        <SidePanel sidePanelIsOpen={hasSidePanel} closeSidePanel={closeSidePanel}>
            <p>Plan Detail Side Panel</p>
            <div>{selectSidePanelContent(openSidePanelName)}</div>
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
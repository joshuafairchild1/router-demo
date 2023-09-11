import { useParams, useSearchParams } from 'react-router-dom'
import React, { useCallback, useMemo } from 'react'
import { routes } from '../routes/router'
import { DefaultLayout } from '../layout/DefaultLayout'
import { NavigationBar, NavigationControl, SiteControl } from '../layout/NavigationBar'
import { DefaultNavigationContent } from '../nav/DefaultNavigationContent'
import { SidePanel } from '../layout/SidePanel'
import { SimpleBreadcrumbs } from '../nav/SimpleBreadcrumbs'
import { useSidebarNav } from '../nav/useSidebarNav'

const sidePanelNames = ['milestone'] as const

export function TemplateDetailScreen() {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sidebarNavOpen, setSidebarNavOpen] = useSidebarNav()
  const openSidePanelName = useMemo(function computeOpenPanel() {
    return sidePanelNames.find((name) => !!searchParams.get(name)) || null
  }, [searchParams])
  const hasSidePanel = !!openSidePanelName
  const closeSidePanel = useCallback(function closeSidePanel() {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      sidePanelNames.forEach((name) => next.delete(name))
      return next
    })
  }, [setSearchParams])

  return <DefaultLayout
    main={
      <div>
        <p>Template Detail</p>
        <pre>{JSON.stringify(params, null, 2)}</pre>
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
    sidePanel={
      openSidePanelName &&
        <SidePanel sidePanelIsOpen={hasSidePanel} closeSidePanel={closeSidePanel}>
            <p>Template Detail Panel</p>
        </SidePanel>}
    header={<div>
      App header
      <SimpleBreadcrumbs route={routes.templateDetail}/>
    </div>}
    footer={<div>App footer</div>}
    siteNotice={<div>Site notice</div>}
  />
}
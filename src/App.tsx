import React, { useCallback } from 'react'
import { DefaultLayout } from './layout/DefaultLayout'
import { NavigationBar, NavigationControl, SiteControl } from './layout/NavigationBar'
import { SidePanel } from './layout/SidePanel'
import { createBrowserRouter, Link, RouterProvider, useParams, useSearchParams } from 'react-router-dom'
import { ErrorPage } from './ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    // Likely what we'll use:
    Component: PlanDashboard,

    // Or, alternatively:
    // element: <TemporaryAppRoot/>,

    // this error applies to all routes, since it's registered at the root
    errorElement: <ErrorPage/>,

    // To support conditional children at the root, based on a sub-route. Goes hand-in-hand with <Outlet>:
    // children: [
    //   {
    //     path: '/plan/:planId',
    //     Component: PlanDetail,
    //   },
    // ],
  },
  {
    path: '/template',
    Component: TemplateDashboard,
  },
  {
    path: '/plan/:planId',
    Component: PlanDetail,
  },
  {
    path: '/template/:templateId',
    Component: TemplateDetail,
  }
])

export function App() {
  return <RouterProvider router={router}/>
}

function PlanDashboard() {
  return <DefaultApplicationScreen
    main={<div>
      <p><Link to="/plan/1">Plan 1</Link></p>
      <p><Link to="/plan/2">Plan 2</Link></p>
      <p><Link to="/plan/3">Plan 3</Link></p>
    </div>}
    sidePanel={<div>
      <p>Plan Dashboard Side Panel</p>
    </div>}
  />
}

function TemplateDashboard() {
  return <DefaultApplicationScreen
    main={<div>
      <p><Link to="/template/1">Template 1</Link></p>
      <p><Link to="/template/2">Template 2</Link></p>
      <p><Link to="/template/3">Template 3</Link></p>
    </div>}
    navigation={<div>
      <p>Custom Template Navigation Bar!</p>
      <Link to="/">Home</Link>
    </div>}
    sidePanel={<div>
      <p>Template Dashboard Side Panel</p>
    </div>}
  />
}

function PlanDetail() {
  const params = useParams()
  return <DefaultApplicationScreen
    main={<div>
      <p>Plan Detail</p>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>}
    sidePanel={<div>
      <p>Plan Detail Side Panel</p>
    </div>}
  />
}

function TemplateDetail() {
  const params = useParams()
  return <DefaultApplicationScreen
    main={<div>
      <p>Template Detail</p>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>}
    sidePanel={<div>
      <p>Template Detail Panel</p>
    </div>}
  />
}

type ScreenProps = {
  main: React.ReactNode
  navigation?: React.ReactNode
  sidePanel?: React.ReactNode
}

function DefaultApplicationScreen(props: ScreenProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const isNavOpen = !!searchParams.get('nav')
  const isSidePanelOpen = !!searchParams.get('panel')
  const setIsNavOpen = useCallback(function setIsNavOpen(isOpen: boolean) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      if (isOpen) {
        next.append('nav', 'open')
      } else {
        next.delete('nav')
      }
      return next
    })
  }, [setSearchParams])
  const setIsSidePanelOpen = useCallback(function setIsSidePanelOpen(isOpen: boolean) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      // TODO: need to know the name of the panel, i.e. something other than 'open'
      if (isOpen) {
        next.append('panel', 'open')
      } else {
        next.delete('panel')
      }
      return next
    })
  }, [setSearchParams])

  return <DefaultLayout
    main={props.main}
    isNavOpen={isNavOpen}
    navigation={{
      // nav bar contents support overrides
      content: <NavigationBar>
        {props.navigation ?? <DefaultNavigationBar/>}
      </NavigationBar>,
      // controls do not support overrides
      siteControl: <SiteControl/>,
      navigationControl: <NavigationControl expanded={isNavOpen} toggle={setIsNavOpen}/>,
    }}
    sidePanelIsOpen={isSidePanelOpen}
    sidePanel={props.sidePanel
      ? <SidePanel sidePanelIsOpen={isSidePanelOpen} setSidePanelIsOpen={setIsSidePanelOpen}>
          {props.sidePanel}
        </SidePanel>
      : undefined}
    // header (?), footer, and site notice are the same for all screens, no overrides
    header={<div>Header</div>}
    footer={<div>Footer</div>}
    siteNotice={<div>Site Notice</div>}
  />
}

function DefaultNavigationBar() {
  return <NavigationBar>
    <p>Default Navigation Bar</p>
    <p><Link to="/">Home</Link></p>
    <p><Link to="/template">Templates</Link></p>
  </NavigationBar>
}
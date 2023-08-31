import React, { useState } from 'react'
import { DefaultLayout } from './layout/DefaultLayout'
import { NavigationBar, NavigationControl, SiteControl } from './layout/NavigationBar'
import { SidePanel } from './layout/SidePanel'
import { createBrowserRouter, Link, RouterProvider, useParams, useRoutes } from 'react-router-dom'
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
    path: '/plan/:planId',
    Component: PlanDetail,
  }
])

export function App() {
  return <RouterProvider router={router}/>
}

function PlanDashboard() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  return <DefaultLayout
    main={<div>
      <p><Link to="plan/1">Plan 1</Link></p>
      <p><Link to="plan/2">Plan 2</Link></p>
      <p><Link to="plan/3">Plan 3</Link></p>
    </div>}
    isNavOpen={isNavOpen}
    navigation={{
      content: <NavigationBar/>,
      siteControl: <SiteControl/>,
      navigationControl: <NavigationControl expanded={isNavOpen} toggle={setIsNavOpen}/>,
    }}
    sidePanel={<SidePanel sidePanelIsOpen={isSidePanelOpen} setSidePanelIsOpen={setIsSidePanelOpen}/>}
    header={<div>Header</div>}
    footer={<div>Footer</div>}
    siteNotice={<div>Site Notice</div>}
    sidePanelIsOpen={isSidePanelOpen}
  />
}

function PlanDetail() {
  const params = useParams()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  return <DefaultLayout
    main={<div>
      <p>Plan Detail</p>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>}
    isNavOpen={isNavOpen}
    navigation={{
      content: <NavigationBar/>,
      siteControl: <SiteControl/>,
      navigationControl: <NavigationControl expanded={isNavOpen} toggle={setIsNavOpen}/>,
    }}
    sidePanel={<SidePanel sidePanelIsOpen={isSidePanelOpen} setSidePanelIsOpen={setIsSidePanelOpen}/>}
    header={<div>Header</div>}
    footer={<div>Footer</div>}
    siteNotice={<div>Site Notice</div>}
    sidePanelIsOpen={isSidePanelOpen}
  />
}
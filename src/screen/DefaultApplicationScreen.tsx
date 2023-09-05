import { Link, useSearchParams } from 'react-router-dom'
import React, { useCallback } from 'react'
import { DefaultLayout } from '../layout/DefaultLayout'
import { NavigationBar, NavigationControl, SiteControl } from '../layout/NavigationBar'
import { SidePanel } from '../layout/SidePanel'

type Props = {
  main: React.ReactNode
  navigation?: React.ReactNode
  sidePanel?: React.ReactNode
}

export function DefaultApplicationScreen(props: Props) {
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
        {props.navigation ?? <DefaultNavigationContent/>}
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
    header={<div>Static header</div>}
    footer={<div>Static footer</div>}
    siteNotice={<div>Static site</div>}
  />
}

function DefaultNavigationContent() {
  return <>
    <p>Default Navigation Bar</p>
    <p><Link to="/">Home</Link></p>
    <p><Link to="/template">Templates</Link></p>
  </>
}
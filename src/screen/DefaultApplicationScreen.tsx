import { Link, useSearchParams } from 'react-router-dom'
import React, { ReactNode, useCallback } from 'react'
import { DefaultLayout } from '../layout/DefaultLayout'
import { NavigationBar, NavigationControl, SiteControl } from '../layout/NavigationBar'
import { SidePanel } from '../layout/SidePanel'
import { ScreenProps } from './ScreenProps'
import { RouteDefinition } from '../routes/router'

/**
 * This type allows restricting the side panel prop to only be present if the route supports it.
 */
type OptionalSidePanel<T extends RouteDefinition> =
  T['supportedPanels'] extends ReadonlyArray<string>
    ? { sidePanelContent: ReactNode }
    : {}

type Props<T extends RouteDefinition> =
  & ScreenProps<T>
  & OptionalSidePanel<T>
  & {
    main: React.ReactNode
    navigation?: React.ReactNode
  }

export function DefaultApplicationScreen<T extends RouteDefinition>(props: Props<T>) {
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
      // More thoughts:
      // - Do we actually have a use case for a "persistent, closed panel"? That seems to be implied by the
      //   `DefaultLayout` implementation, but maybe that was exploratory?
      // - In our current side panel usage, it's opened by some "external" action, and closed via direct interaction,
      //   or another "external" action
      // - If we do have a use case for a "persistent, closed panel", then we need to know the name of the panel
      //   so that we can support multiple panels - not really possible in the current implementation.
      //   If we do not need to support it, then this component doesn't need to be concerned with "panel names", because
      //   the screen component itself will handle redirecting to the route with the panel name. This would imply that
      //   the `sidePanelContent` prop becomes a render prop that accepts the current panel name as an argument.
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
    sidePanel={('sidePanelContent' in props && props.sidePanelContent)
      ? <SidePanel sidePanelIsOpen={isSidePanelOpen} setSidePanelIsOpen={setIsSidePanelOpen}>
          {props.sidePanelContent}
        </SidePanel>
      : undefined}
    // header (?), footer, and site notice are the same for all screens, no overrides
    header={<div>Static header</div>}
    footer={<div>Static footer</div>}
    siteNotice={<div>Static site notice</div>}
  />
}

function DefaultNavigationContent() {
  return <>
    <p>Default Navigation Bar</p>
    <p><Link to="/">Home</Link></p>
    <p><Link to="/template">Templates</Link></p>
  </>
}
import React, { ReactNode, useMemo } from 'react'
import { useSidebarNav } from './useSidebarNav'
import { NavigationBar, NavigationControl, SiteControl } from '../layout/NavigationBar'
import { DefaultNavigationContent } from './DefaultNavigationContent'

// TODO: maybe useful?
export function useLocalStorageBasedNavigation(navigationContent: ReactNode) {
  const [sidebarNavOpen, setSidebarNavOpen] = useSidebarNav()
  return useMemo(() => ({
    content: <NavigationBar>
      {navigationContent || <DefaultNavigationContent/>}
    </NavigationBar>,
    siteControl: <SiteControl/>,
    navigationControl:
      <NavigationControl
        expanded={sidebarNavOpen}
        toggle={setSidebarNavOpen}
      />,
  }), [sidebarNavOpen, setSidebarNavOpen])
}
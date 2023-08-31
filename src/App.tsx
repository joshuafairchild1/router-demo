import React, { useState } from 'react'
import { DefaultLayout } from './layout/DefaultLayout'
import { NavigationBar, NavigationControl, SiteControl } from './layout/NavigationBar'
import { SidePanel } from './layout/SidePanel'

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  return <DefaultLayout
    main={<div>Main Content</div>}
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

export default App
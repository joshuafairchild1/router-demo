import React, { memo, PropsWithChildren } from 'react'

type SidePanelProps = PropsWithChildren<{
  sidePanelIsOpen: boolean
  closeSidePanel: VoidFunction
}>

export const SidePanel = memo(function NavBar(props: SidePanelProps) {
  return (props.sidePanelIsOpen && <div style={{
    height: '34em',
    backgroundColor: 'violet',
  }}
  >
    <div onClick={props.closeSidePanel} title="Close">
      X
    </div>
    {props.children}
  </div>) || null
})
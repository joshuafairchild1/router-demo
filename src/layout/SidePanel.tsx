import React, { memo, PropsWithChildren } from 'react'

type SidePanelProps = PropsWithChildren<{
  setSidePanelIsOpen: (val: boolean) => void
  sidePanelIsOpen: boolean
}>

export const SidePanel = memo(function NavBar(props: SidePanelProps) {
  return <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    height: '34em',
    backgroundColor: 'violet',
  }}
  >
    <div onClick={() => props.setSidePanelIsOpen(!props.sidePanelIsOpen)} title="Close">
      X
    </div>
    {props.children}
  </div>
})
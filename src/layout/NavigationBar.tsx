import React, { memo } from 'react'
import { MenuToggle } from './MenuToggle'

export function NavigationBar() {
  return <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    height: '34em',
    backgroundColor: 'aqua',
  }}
  >
    Navigation Bar
  </div>
}

type Props = {
  toggle: (expanded: boolean) => void
  expanded: boolean
}

export const NavigationControl = memo(function NavigationControl(props: Props) {
  const { expanded } = props
  return <div style={{
      display: 'flex',
      justifyContent: 'end',
      height: '4em',
      backgroundColor: 'salmon',
    }}
  >
    <div
      title={expanded ? 'Close' : 'Open'}
      onClick={() => props.toggle(!expanded)}
    >
      <MenuToggle expanded={expanded} />
    </div>
  </div>
})

export const SiteControl = memo(function SiteControl() {
  return <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    height: '4em',
    backgroundColor: 'fuchsia',
  }}
  >
    Site Control
  </div>
})
import { useCallback, useState } from 'react'
import LocalStorageItem from '../lib/LocalStorageItem'

const isNavOpen = new LocalStorageItem('sidebar-nav-open')

export function useSidebarNav() {
  const [navOpen, setNavOpenInternal] = useState(isNavOpen.get() === 'true')

  const setNavOpen = useCallback(function setNavOpen(isOpen: boolean) {
    setNavOpenInternal(isOpen)
    isNavOpen.set(isOpen.toString())
  }, [])

  return [navOpen, setNavOpen] as const
}
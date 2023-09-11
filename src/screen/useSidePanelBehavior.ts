import { useSearchParams } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

class SidePanelBehavior<T extends string> {
  readonly hasSidePanel =  !!this.openSidePanelName
  constructor(
    readonly openSidePanelName: T | null,
    readonly closeSidePanel: VoidFunction,
  ) {}
}

export const QUERY_PARAM_PANEL = 'panel'

export function useSidePanelBehavior<T extends string>(
  panelNames: ReadonlyArray<T>,
): SidePanelBehavior<T> {
  const [searchParams, setSearchParams] = useSearchParams()
  const openSidePanelName = useMemo(function computeOpenPanel() {
    return panelNames.find((name) => searchParams.get(QUERY_PARAM_PANEL) === name) || null
  }, [panelNames, searchParams])
  const closeSidePanel = useCallback(function closeSidePanel() {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      next.delete(QUERY_PARAM_PANEL)
      return next
    })
  }, [setSearchParams])
  return new SidePanelBehavior(openSidePanelName, closeSidePanel)
}
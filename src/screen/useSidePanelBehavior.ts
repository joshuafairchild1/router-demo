import { useCallback, useMemo } from 'react'
import { useQueryParams } from '../routes/useQueryParams'

class SidePanelBehavior<T extends string> {
  readonly hasSidePanel = !!this.openSidePanelName

  constructor(
    readonly openSidePanelName: T | null,
    readonly closeSidePanel: VoidFunction,
  ) {}
}

export const QUERY_PARAM_PANEL = 'panel'

export function useSidePanelBehavior<T extends string>(
  panelNames: ReadonlyArray<T>,
): SidePanelBehavior<T> {
  const { params, deleteParam } = useQueryParams()
  const openSidePanelName = useMemo(function computeOpenPanel() {
    return panelNames.find((name) => params.get(QUERY_PARAM_PANEL) === name) || null
  }, [panelNames, params])
  const closeSidePanel = useCallback(function closeSidePanel() {
    deleteParam(QUERY_PARAM_PANEL)
  }, [deleteParam])

  return new SidePanelBehavior(openSidePanelName, closeSidePanel)
}
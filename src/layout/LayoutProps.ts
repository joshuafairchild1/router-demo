import { ReactNode } from 'react'

export type LayoutProps = {
  readonly navigation?: {
    readonly siteControl: ReactNode,
    readonly content: ReactNode,
    readonly navigationControl: ReactNode,
  },
  readonly header?: ReactNode,
  readonly main?: ReactNode,
  readonly sidePanel?: ReactNode,
  readonly footer?: ReactNode,
  /**
   * Show a "global" notice persistently, unlike a toast. Use cases:
   * "In Read-only Mode", "New version available", "New version coming in ...", etc.
   */
  readonly siteNotice?: ReactNode,
}

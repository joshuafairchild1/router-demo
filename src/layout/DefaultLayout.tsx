import { percent, px } from 'csx'
import React from 'react'
import { LayoutProps } from './LayoutProps'
import { classes, stylesheet } from 'typestyle'

export type DefaultLayoutProps = LayoutProps & {
  isNavOpen: boolean
  sidePanelIsOpen: boolean
}

export function DefaultLayout(props: DefaultLayoutProps) {
  const layoutClasses = getLayoutClass(props)
  const hasNavigation = props.navigation !== undefined && props.isNavOpen
  return <div className={classes(css.Base, layoutClasses.layoutClass)}>
    <div
      className={layoutClasses.siteNoticeClass}
      data-has-notice={props.siteNotice !== undefined}
    >
      {props.siteNotice}
    </div>


    <div
      className={layoutClasses.contentClass}
      data-nav-open={hasNavigation}
    >
      <div
        className={layoutClasses.headerClass}
        data-nav-open={hasNavigation}
      >
        {props.header}
      </div>
      <div className={layoutClasses.mainClass}>
        {props.main}
      </div>
      <div
        className={layoutClasses.sidePanelClass}
        data-side-panel-open={props.sidePanelIsOpen}
      >
        {props.sidePanel}
      </div>
      <div className={layoutClasses.footerClass}>
        {props.footer}
      </div>
    </div>


    <div
      className={layoutClasses.navigationClass}
      data-nav-open={hasNavigation}
      data-has-notice={props.siteNotice !== undefined}
    >
      <div className={layoutClasses.navigationContentClass}>
        {props.navigation?.content}
      </div>
      <div className={layoutClasses.navigationSiteControlClass}>
        {props.navigation?.siteControl}
      </div>
      <div className={layoutClasses.navigationControlClass}>
        {props.navigation?.navigationControl}
      </div>
    </div>


  </div>
}

type LayoutClasses = {
  layoutClass: string
  sidePanelClass: string
  headerClass: string
  mainClass: string
  contentClass: string
  footerClass: string
  navigationControlClass: string
  navigationClass: string
  navigationSiteControlClass: string
  siteNoticeClass: string
  navigationContentClass: string
}

function getLayoutClass(props: DefaultLayoutProps): LayoutClasses {
  const { header, navigation, main, sidePanel, footer } = props
  return {
    layoutClass: css.Layout,
    siteNoticeClass: css.SiteNotice,
    contentClass: css.Content,
    navigationClass: navigation ? css.Navigation : css.HideComponent,
    sidePanelClass: sidePanel ? css.SidePanel : css.HideComponent,
    mainClass: main ? css.Main : css.HideComponent,
    headerClass: header ? css.Header : css.HideComponent,
    footerClass: footer ? '' : css.HideComponent,
    navigationControlClass: navigation?.navigationControl  ? css.NavigationControl : css.HideComponent,
    navigationSiteControlClass: navigation?.siteControl ? css.SiteControl : css.HideComponent,
    navigationContentClass: navigation?.content  ? css.NavigationContent : css.HideComponent,
  }
}

const css = stylesheet({
  Base: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: '1px dotted black',
    gap: px(2),
    $nest: {
      '& > div': {
        border: '1px dotted #ccc',
      },
    },
  },
  HideComponent: {
    display: 'none',
  },
  Layout: {
    position: 'relative',
    display: 'flex',
    width: percent(100),
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  Navigation: {
    position: 'absolute',
    width: px(300),
    height: percent(100),
    display: 'grid',
    gridTemplateAreas: `
      "siteControl navControl"
      "nav nav"
      `,
    gridTemplateRows: '1fr 1fr',
    top: 0,
    left: 0,
    overflow: 'visible',
    transition: 'left 200ms ease 0s, top 200ms ease 0s',
    '&[data-nav-open="false"]': {
      left: px(-260),
      height: px(40),
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    '&[data-has-notice="true"]': {
      top: px(50),
    },
  },
  NavigationControl: {
    gridArea: 'navControl',
    alignItems: 'end',
  },
  NavigationContent: {
    gridArea: 'nav',
  },
  SiteControl: {
    gridArea: 'siteControl',
  },
  Content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    transition: 'padding-left 200ms ease 0s',
    paddingLeft: px(300),
    '&[data-nav-open="false"]': {
      paddingLeft: 0,
    },
  },
  SidePanel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    height: percent(100),
    width: px(300),
    top: px(50),
    right: 0,
    zIndex: 10,
    transition: 'right 200ms ease 0s',
    '&[data-side-panel-open="false"]': {
      right: px(-260),
      height: px(40),
      alignItems: 'start',
    },
    '&[data-mobile-device="true"]': {
      zIndex: 10,
      width: percent(100),
    },
  },
  Header: {
    position: 'relative',
    display: 'flex',
    width:  percent(100),
    height: px(50),
    flexShrink: 0,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    '&[data-nav-open="false"]': {
      paddingLeft: px(40),
    },
  },
  Main: {
    position: 'relative',
    backgroundColor: 'pink',
  },
  SiteNotice: {
    height: px(50),
    transition: 'height 200ms ease 0s',
    '&[data-has-notice="false"]': {
      height: 0,
    },
  },
})
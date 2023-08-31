import React from 'react'
import { stylesheet } from 'typestyle'

export function MenuToggle(props: { expanded: boolean }) {
  return <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={css.ToggleIcon}
    data-is-expanded={props.expanded}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 10H0V12H9V10ZM15.7809 10.3753L12.2806 5.99998L15.7809 1.62467L14.2191 0.375281L10.2191 5.37528L9.71938 5.99998L10.2191 6.62467L14.2191 11.6247L15.7809 10.3753ZM9 5H0V7H9V5ZM0 -1.71661e-05H9V1.99998H0V-1.71661e-05Z"
      fill="black"
    />
  </svg>

}

const css = stylesheet({
  ToggleIcon: {
    transformOrigin: '50% 50%',
    // TODO: ALN-340 use a common factory function for default transition duration and type
    //       defaultTransition('transform'),
    transition: 'transform 0.2s ease-in-out',
    $nest: {
      '&[data-is-expanded="false"]': {
        transform: 'rotate(180deg)',
      },
    },
  },
})

import { Link } from 'react-router-dom'
import React from 'react'

export function DefaultNavigationContent() {
  return <>
    <p>Default Navigation Bar</p>
    <p><Link to="/">Home</Link></p>
    <p><Link to="/template">Templates</Link></p>
  </>
}
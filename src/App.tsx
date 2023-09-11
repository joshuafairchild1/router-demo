import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router, routes } from './routes/router'
import { setUpBreadcrumbs } from './routes/breadcrumbs'

setUpBreadcrumbs(routes)

export function App() {
  return <RouterProvider router={router}/>
}
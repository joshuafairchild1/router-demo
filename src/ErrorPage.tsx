import { Link, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <Link to="/">Home</Link>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{tryGetMessage(error)}</i>
      </p>
    </div>
  )
}

function tryGetMessage(error: any) {
  if ('statusText' in error) {
    return error.statusText
  }
  if ('message' in error) {
    return error.message
  }
  return 'Unknown error'
}
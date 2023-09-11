import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

/**
 * Thin wrapper around react-router-dom's {@link useSearchParams} hook, providing functions that make
 * it more straightforward to manipulate query parameters.
 */
export function useQueryParams() {
  const [params, setParams] = useSearchParams()

  const setParam = useCallback(function setParam(name: string, value: string) {
    const next = new URLSearchParams(params)
    next.delete(name)
    next.set(name, value)
    setParams(next)
  }, [params, setParams])

  const deleteParam = useCallback(function deleteParam(name: string) {
    const next = new URLSearchParams(params)
    next.delete(name)
    setParams(next)
  }, [params, setParams])

  return {
    params,
    setParam,
    setParams,
    deleteParam,
  }
}
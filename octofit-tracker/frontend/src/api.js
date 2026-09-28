import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, count: payload.length }
  }

  const collection = payload?.data ?? payload
  const items = Array.isArray(collection?.results)
    ? collection.results
    : Array.isArray(collection?.items)
      ? collection.items
      : Array.isArray(collection?.data)
        ? collection.data
        : []

  return {
    items,
    count: Number.isFinite(collection?.count) ? collection.count : items.length,
  }
}

export function useApiCollection(resource) {
  const [collection, setCollection] = useState({ items: [], count: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_BASE_URL}/${resource}/`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        setCollection(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this collection')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [resource])

  return { ...collection, loading, error }
}
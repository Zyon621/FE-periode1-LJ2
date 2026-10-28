import { useEffect, useState } from 'react'

function useFetch(url) {
  const [result, setResult] = useState({ url: null, data: null, error: null })

  useEffect(() => {
    let cancelled = false

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setResult({ url, data, error: null })
      })
      .catch((err) => {
        if (!cancelled) setResult({ url, data: null, error: err.message })
      })

    return () => {
      cancelled = true
    }
  }, [url])

  const loading = result.url !== url

  return {
    data: loading ? null : result.data,
    loading,
    error: loading ? null : result.error,
  }
}

export default useFetch

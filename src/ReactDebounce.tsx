import { useState, useEffect } from 'react'
import { useDebounceValue } from './hooks'
import { getAutocompleteResults } from './utils'

function ReactDebounce() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestion] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [cache, setCache] = useState<Record<string, string[]>>({})

  const debounceQuery = useDebounceValue(query)
  const controller = new AbortController()

  // Methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  // Effect
  useEffect(() => {
    const signal = controller.signal
    if (!debounceQuery) {
      return setSuggestion([])
    }

    if (typeof cache[debounceQuery] !== 'undefined') {
      return setSuggestion(cache[debounceQuery])
    }

    ;(async () => {
      setIsLoading(true)
      const data = await getAutocompleteResults(debounceQuery, signal)
      setSuggestion(data)
      setCache({
        ...cache,
        [debounceQuery]: data
      })
      setIsLoading(false)
    })()

    return () => controller.abort('cancel request')
  }, [debounceQuery])

  // Computed
  const suggestionElement = suggestions.map((suggestion) => (
    <li key={suggestion}>{suggestion}</li>
  ))

  return (
    <div className="App">
      <input type="text" value={query} onChange={handleChange} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="output">{suggestionElement}</ul>
      )}
    </div>
  )
}

export default ReactDebounce

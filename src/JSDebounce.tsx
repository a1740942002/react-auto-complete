import { useState, useEffect, useCallback } from 'react'
import { getAutocompleteResults } from './utils'
import debounce from 'lodash.debounce'

function JSDebounce() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestion] = useState<string[]>([])

  // Methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  const debounceHandler = useCallback(debounce(handleChange), [])

  // Effect
  useEffect(() => {
    ;(async () => {
      if (!query) {
        return setSuggestion([])
      }
      const data = await getAutocompleteResults(query)
      setSuggestion(data)
    })()
  }, [query])

  // Computed
  const suggestionElement = suggestions.map((suggestion) => (
    <li key={suggestion}>{suggestion}</li>
  ))

  return (
    <div className="App">
      <input type="text" value={query} onChange={debounceHandler} />
      <ul className="output">{suggestionElement}</ul>
    </div>
  )
}

export default JSDebounce

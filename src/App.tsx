import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'
import ReactDebounce from './ReactDebounce'
import JSDebounce from './JSDebounce'

function App() {
  return (
    <div>
      <h2>React Debounce</h2>
      <ReactDebounce />
      <hr />
      <h2>JS Debounce</h2>
      <JSDebounce />
    </div>
  )
}

export default App

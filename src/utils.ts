export function getAutocompleteResults(
  query: string,
  signal?: AbortSignal
): Promise<string[]> {
  const fruits: string[] = [
    'Strawberry',
    'Rapsberry',
    'Blueberry',
    'Blackberry',
    'Cranberry',
    'Cucumber'
  ]

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (signal?.aborted) {
        reject(signal.reason)
      }

      resolve(
        fruits.filter((fruit) =>
          fruit.toLowerCase().includes(query.toLowerCase())
        )
      )
    }, Math.random() * 2000)
  })
}

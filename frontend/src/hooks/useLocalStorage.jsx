import { useEffect, useState } from 'react'

function useLocalStorage(key, initialState) {
  const [state, setState] = useState(() => {
    const data = JSON.parse(localStorage.getItem(key) || 'null')
    return data || initialState
  }, [])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  return [state, setState]
}

export default useLocalStorage

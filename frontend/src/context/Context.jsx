import { createContext, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const TodolistContext = createContext()

export default function Provider({ children }) {
  const [user, setUser] = useLocalStorage('user', {})
  const [creating, setCreating] = useState(false)
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      creating,
      setCreating
    }),
    [creating, setUser, user],
  )
  return (
    <TodolistContext.Provider value={contextValue}>
      {children}
    </TodolistContext.Provider>
  )
}

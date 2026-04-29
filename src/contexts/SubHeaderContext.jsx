import { createContext, useContext, useState, useCallback } from 'react'

const SubHeaderContext = createContext(null)

export function SubHeaderProvider({ children }) {
  const [subHeader, setSubHeaderState] = useState(null)
  const setSubHeader = useCallback((data) => setSubHeaderState(data), [])
  return (
    <SubHeaderContext.Provider value={{ subHeader, setSubHeader }}>
      {children}
    </SubHeaderContext.Provider>
  )
}

export const useSubHeader = () => useContext(SubHeaderContext)

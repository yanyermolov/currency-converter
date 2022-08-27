import { createContext, useContext, useMemo, useState } from "react"

const CurrenciesContext = createContext({})
const useCurrenciesContext = () => useContext(CurrenciesContext)

const CurrenciesContextProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const value = useMemo(() => ({ currencies, setCurrencies, isLoading, setIsLoading }), [currencies, isLoading])

  return (
    <CurrenciesContext.Provider {...{ value }}>{children}</CurrenciesContext.Provider>
  )
}

export { CurrenciesContextProvider, useCurrenciesContext }
import React, { useCallback, useEffect, useState } from 'react'
import { useCurrenciesContext } from '../../context/CurrencyContextProvider'
import './converter.scss'
import Currency from '../Currency'
import { getCurrencies } from '../../actions/currencies'

const uah = {
  cc: 'UAH',
  rate: 1,
  txt: 'УкраЇнська гривня',
  r030: 980,
}

const defaultToCurrency = 'USD'

const Converter = () => {
  const { setCurrencies, isLoading, setIsLoading } = useCurrenciesContext()

  const [fromCurrency, setFromCurrency] = useState(null)
  const [fromValue, setFromValue] = useState(0)
  const [toCurrency, setToCurrency] = useState(null)
  const [toValue, setToValue] = useState(0)

  const handleValue = useCallback(
    (e) => {
      const isFrom = e.target.name === 'from'
      const amount = e.target.value

      // es6 syntax

      setFromValue(
        isFrom ? amount : amount * (toCurrency.rate / fromCurrency.rate)
      )
      setToValue(
        isFrom ? amount * (fromCurrency.rate / toCurrency.rate) : amount
      )

      // early return pattern

      // if (isFrom) {
      //   setFromValue(amount)
      //   setToValue(amount * (fromCurrency.rate / toCurrency.rate))

      //   return
      // }

      // setToValue(amount)
      // setFromValue(amount * (toCurrency.rate / fromCurrency.rate))
    },
    [fromCurrency?.rate, toCurrency?.rate]
  )

  const handleCurrencyRates = async () => {
    setIsLoading(true)

    try {
      const result = await getCurrencies()
      const currenciesArr = [...result, uah].sort((a, b) =>
        a.txt.localeCompare(b.txt)
      )
      setCurrencies(currenciesArr)
      const defaultToCurrencyObj = currenciesArr.find(
        (currency) => currency.cc === defaultToCurrency
      )
      setFromCurrency(defaultToCurrencyObj)
      setToCurrency(uah)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(
        'Something went wrong during fetching currency rates data:',
        error
      )
    }
  }

  useEffect(() => {
    handleCurrencyRates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    !isLoading && setToValue(fromValue * (fromCurrency.rate / toCurrency.rate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency])

  useEffect(() => {
    !isLoading && setFromValue(toValue * (toCurrency.rate / fromCurrency.rate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCurrency])

  return (
    <div className='box'>
      <Currency
        label='From'
        currency={fromCurrency}
        setCurrency={setFromCurrency}
        value={fromValue}
        onValueChange={handleValue}
      />

      <Currency
        label='To'
        currency={toCurrency}
        setCurrency={setToCurrency}
        value={toValue}
        onValueChange={handleValue}
      />
    </div>
  )
}

export default Converter

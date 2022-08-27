import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactSelect from 'react-select'
import { useCurrenciesContext } from '../context/CurrencyContextProvider'
import './converter.scss'
const uah = {
  cc: 'UAH',
  rate: 1,
  txt: 'УкраЇнська гривня',
  r030: 980,
}

const defaultToCurrency = 'USD'

const Converter = () => {
  const { currencies, setCurrencies, isLoading, setIsLoading } =
    useCurrenciesContext()
  const [fromCurrency, setFromCurrency] = useState(null)
  const [fromValue, setFromValue] = useState(0)
  const [toCurrency, setToCurrency] = useState(null)
  const [toValue, setToValue] = useState(0)

  const handleFromCurrency = (value) => setFromCurrency(value)
  const handleFromValue = (e) => {
    const amount = e.target.value
    setFromValue(amount)
    setToValue(amount * (fromCurrency.rate / toCurrency.rate))
  }
  const handleToCurrency = (value) => setToCurrency(value)
  const handleToValue = (e) => {
    const amount = e.target.value
    setToValue(amount)
    setFromValue(amount * (toCurrency.rate / fromCurrency.rate))
  }

  const handleCurrencyRates = async () => {
    setIsLoading(true)
    const URL =
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'

    try {
      const response = await axios.get(URL)
      const result = response.data
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
    <div>
      <h1 style={{ fontSize: '30px', color: 'white' }}>Converter</h1>
      <div className='box'>
        <div>
          <h5 style={{ fontSize: '20px', lineHeight: '1px' }}>From</h5>
          <ReactSelect
            classNamePrefix='custom-style'
            value={fromCurrency}
            options={currencies}
            formatOptionLabel={(option, { context }) =>
              context === 'menu' ? `${option.cc} ${option.txt}` : option.cc
            }
            isOptionSelected={(option) => option.cc === fromCurrency.cc}
            onChange={handleFromCurrency}
            {...{ isLoading }}
          />
          <input
            className='input1'
            type='number'
            value={fromValue}
            onChange={handleFromValue}
          />
        </div>
        <div>
          <h5 style={{ fontSize: '20px', lineHeight: '1px' }}>To</h5>
          <ReactSelect
            classNamePrefix='custom-select'
            value={toCurrency}
            options={currencies}
            formatOptionLabel={(option, { context }) =>
              context === 'menu' ? `${option.cc} ${option.txt}` : option.cc
            }
            isOptionSelected={(option) => option.cc === fromCurrency.cc}
            onChange={handleToCurrency}
            {...{ isLoading }}
          />
          <input
            className='input2'
            type='number'
            value={toValue}
            onChange={handleToValue}
          />
        </div>
      </div>
    </div>
  )
}

export default Converter

import React from 'react'
import { useCurrenciesContext } from '../../context/CurrencyContextProvider'
import ReactSelect from 'react-select'
import './currency.scss'

const Currency = ({ label, currency, setCurrency, value, onValueChange }) => {
  const { currencies, isLoading } = useCurrenciesContext()

  return (
    <div className='currency-wrapper'>
      <h5 style={{ fontSize: '20px', lineHeight: '1px' }}>{label}</h5>

      <ReactSelect
        classNamePrefix='custom-select'
        value={currency}
        options={currencies}
        formatOptionLabel={(option, { context }) =>
          context === 'menu' ? `${option.cc} ${option.txt}` : option.cc
        }
        isOptionSelected={(option) => option.cc === currency.cc}
        onChange={setCurrency}
        {...{ isLoading }}
      />

      <input
        className='input'
        type='number'
        name='from'
        value={value}
        onChange={onValueChange}
      />
    </div>
  )
}

export default Currency

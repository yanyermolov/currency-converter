import React from 'react'
import { useCurrenciesContext } from '../../context/CurrencyContextProvider'
import './header.scss'

const Header = () => {
  const { currencies } = useCurrenciesContext()

  const displayCurrencies = currencies.filter(
    (currency) => currency.cc === 'USD' || currency.cc === 'EUR'
  )

  return (
    <div className='nav'>
      <div
        style={{
          fontWeight: '700',
          fontSize: '45px',
          pointerEvents: 'none',
          color: 'white',
        }}
      >
        Currency Converter
      </div>
      <div className='act-curr'>
        {displayCurrencies.map((currency) => (
          <div key={currency.r030}>
            {currency.cc}: {currency.rate.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header

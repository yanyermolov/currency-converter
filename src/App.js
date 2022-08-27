import './App.scss'
import Converter from './components/Converter'
import Header from './components/Header'

function App() {
  return (
    <div>
      <Header />
      <div className='container'>
        <Converter />
      </div>
    </div>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/property/:slug" element={<PropertyDetails />} />
    </Routes>
  )
}

export default App

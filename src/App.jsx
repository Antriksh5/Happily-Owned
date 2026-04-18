import { Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import Home from './pages/Home'
import PropertyDetails from './pages/PropertyDetails'
import PropertyResults from './pages/PropertyResults'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<PropertyResults />} />
      <Route path="/property/:slug" element={<PropertyDetails />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />
    </Routes>
  )
}

export default App

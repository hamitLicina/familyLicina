import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Category from './pages/Category/Category'
import Header from './components/Header/Header'
import Auth from './pages/Auth/Auth'


function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/category/:categoryName' element={<Category />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

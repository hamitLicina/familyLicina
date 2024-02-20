import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Category from './pages/Category/Category'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/category/:categoryName' element={<Category/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

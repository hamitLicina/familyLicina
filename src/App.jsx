import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Category from './pages/Category/Category'
import Header from './components/Header/Header'
import Auth from './pages/Auth/Auth'
import AddArticle from './pages/AddArticle/AddArticle'
import AddFamilyMember from './pages/AddFamilyMember/AddFamilyMember'
import ArticleDetails from './pages/ArticleDetails/ArticleDetails'
import Footer from './components/Footer/Footer'



function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/addarticle' element={<AddArticle />} />
        <Route path='/addfamilymember' element={<AddFamilyMember />} />
        <Route path='/category/:categoryName' element={<Category />} />
        <Route path='/article/:articleId' element={<ArticleDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

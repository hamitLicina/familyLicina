import React from 'react'
import './Header.css'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {

  const categories = ["Family Members", "Travel", "Health", "Food"]

  const navigate = useNavigate()


  return (
    <div className='header-container'>
      <FaHome onClick={() => navigate('/')} className='home-icon'/>
      <div className='categories-container'>
        {
          categories.map((item) => (<Link className='nav-link' to={`/category/${item}`}>{item}</Link>))
        }
      </div>
    </div>
  )
}

export default Header
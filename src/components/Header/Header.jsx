import React from 'react'
import './Header.css'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'


function Header() {

  const categories = ["Family Members", "Travel", "Health", "Food"]


  return (
    <div className='header-container'>
      <FaHome />
      <div className='categories-container'>
        {
          categories.map((item) => (<Link className='nav-link' to={`/category/${item}`}>{item}</Link>))
        }
      </div>
    </div>
  )
}

export default Header
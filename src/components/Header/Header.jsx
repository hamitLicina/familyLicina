import React from 'react'
import './Header.css'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/FirebaseConfig'
import { signOut } from 'firebase/auth'



function Header() {

  const [user] = useAuthState(auth)

  const categories = ["Family Members", "Travel", "Health", "Food"]

  const navigate = useNavigate()


  return (
    <div className='header-container'>
      <FaHome onClick={() => navigate('/')} className='home-icon' />
      {
        user && <Link to="/addarticle" className='auth-link' > Add Family Member </Link>
      }
      <div className='categories-container'>
        {
          categories.map((item, index) => (<Link className='nav-link' key={index} to={`/category/${item}`}>{item}</Link>))
        }
      </div>
      {
        // Before Code I need to install react firebase hooks
        user ? <div><span className='username'>{user?.displayName}</span> <button className="auth-link" onClick={() => signOut(auth)}>Log out</button> </div>
          : <Link className='auth-link' to="/auth">Sign up</Link>
      }
    </div>
  )
}

export default Header
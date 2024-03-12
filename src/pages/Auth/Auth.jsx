import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import './Auth.css'
import { auth } from '../../config/FirebaseConfig'
import { useNavigate } from 'react-router-dom'



function Auth() {
    const navigate = useNavigate()
    const [existingUser, setExistingUser] = useState(false)
    // After we prepared our form, we need to follow of the track of name, mail and password so we should set State
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // Now we will arrange submit this form
    const handleSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then(res => {
            updateProfile(auth.currentUser, { displayName: name });
            navigate("/")
        })
            .catch(err => alert(err.code))
    }
    const handleLogin = (e) => {
        e.preventDefault();
        // Login
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => navigate("/"))
            .catch((err) => alert(err.code));
    };

    return (
        <div>
            {existingUser ?
                <form className='auth-form' onSubmit={handleLogin} >
                    <h1>Log in with your e-mail</h1>
                    <div className="form-group">
                        <input type='email' placeholder='Enter your e-mail' required onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input type='password' placeholder='Enter your Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <button type='submit'>Log in</button>
                    <p>Don't have an account ? <span className="form-link" onClick={() => setExistingUser(false)} >Sign up</span></p>
                </form> :
                <form className='auth-form' onSubmit={handleSignup} >
                    <h1>Sign up with your e-mail</h1>
                    <div className="form-group">
                        <input type='text' placeholder='Enter your Name' required onChange={(e) => setName(e.target.value)} value={name} />
                        <input type='email' placeholder='Enter your e-mail' required onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input type='password' placeholder='Enter your Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <button type='submit'>Register</button>
                    <p>Already have an account ? <span className="form-link" onClick={() => setExistingUser(true)} >Log in</span></p>
                </form>}
        </div>
    )
}

export default Auth
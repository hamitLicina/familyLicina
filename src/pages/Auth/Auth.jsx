import React, { useState } from 'react'
import './Auth.css'


function Auth() {

    const [existingUser, setExistingUser] = useState(false)
    // After we prepared our form, we need to follow of the track of name, mail and password so we should set State
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            {existingUser ?
                <form className='auth-form'>
                    <h1>Log in with your e-mail</h1>
                    <div className="form-group">
                        <input type='email' placeholder='Enter your e-mail' required />
                        <input type='password' placeholder='Enter your Password' required />
                    </div>
                    <button type='submit'>Log in</button>
                    <p>Don't have an account ? <span className="form-link" onClick={() => setExistingUser(false)} >Sign up</span></p>
                </form> :
                <form className='auth-form'>
                    <h1>Sign up with your e-mail</h1>
                    <div className="form-group">
                        <input type='text' placeholder='Enter your Name' required />
                        <input type='email' placeholder='Enter your e-mail' required />
                        <input type='password' placeholder='Enter your Password' required />
                    </div>
                    <button type='submit'>Register</button>
                    <p>Already have an account ? <span className="form-link" onClick={() => setExistingUser(true)} >Log in</span></p>
                </form>}
        </div>
    )
}

export default Auth
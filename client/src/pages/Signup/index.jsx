import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState(null)
    // const [nameErr, setNameErr] = useState(false)
    // const [emailErr, setEmailErr] = useState(false)
    // const [passErr, setPassErr] = useState(false)

    // const isValidEmail = (email) => {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    // }

    const isStrongPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    }


    const handleSignup = (e) => {
        e.preventDefault()

        if (name.trim() === "" || email.trim() === "" || password.trim() === "") return setErrMsg("Please fill in all fields")

        if (!isStrongPassword(password)) return setErrMsg("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.")

        // if (!isValidEmail(email)) {
        //     setErrMsg('')
        //     setEmailErr(true)
        //     return 
        // }

        const userLogin = async () => {
            const userCredentials = { name, email, password }
            const url = `https://scenehive.onrender.com/api/signup`
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userCredentials)
            }

            try {
                const res = await fetch(url, options)
                const data = await res.json()
                console.log(data)
                const jwt = data.token
                if (jwt) {
                    Cookies.set("jwt_token", jwt, { expires: 5 })
                    navigate('/')
                } else if (data.errMessage) {
                    setErrMsg(data.errMessage)
                }
            } catch (err) {
                console.error(err)
            }
        }

        userLogin()
    }

    return (
        <main className="signup-page">
            <form className="signup-form" onSubmit={handleSignup}>
                <h1 className="logo">SceneHive</h1>

                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder='name' />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder='email' />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder='password' />
                </div>

                <p>Have an account? <Link to="/login">Log in</Link></p>

                {errMsg && <p className='error-msg'>{errMsg}</p>}

                <button type='submit'>SIGNUP</button>
            </form>
        </main>
    )
}

export default Signup
import { useState, use } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import FavoritesContext from '../../contexts/FavoritesContext'
import './index.css'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const { setToken } = use(FavoritesContext)

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
                setToken(jwt)
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

    const passwordType = showPassword ? "text" : "password"
    const passwordStyles = passwordFocus ? "pass-focus" : ""

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

                {/* <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder='password' />
                </div> */}

                <div className='password-cont'>
                    <label htmlFor="passoword">Password</label>

                    <div className={`password-cont ${passwordStyles}`}>
                        <input
                            type={passwordType}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            placeholder='password' />

                        {showPassword
                            ? <IoEyeOffOutline onClick={() => setShowPassword(!showPassword)} />
                            : <IoEyeOutline onClick={() => setShowPassword(!showPassword)} />
                        }
                    </div>
                </div>

                <p>Have an account? <Link to="/login">Log in</Link></p>

                {errMsg && <p className='error-msg'>{errMsg}</p>}

                <button type='submit'>SIGNUP</button>
            </form>
        </main>
    )
}

export default Signup
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState(null)

    const handleLogin = (e) => {
        e.preventDefault()

        if (email.trim() === "" || password.trim() === "") return setErrMsg("Please fill in all fields")

        const userLogin = async () => {
            const userCredentials = { email, password }
            const url = `http://localhost:5000/login`
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
        <main className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="logo">SceneHive</h1>

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

                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>

                {errMsg && <p className='error-msg'>{errMsg}</p>}

                <button type='submit'>LOGIN</button>
            </form>
        </main>
    )
}

export default Login
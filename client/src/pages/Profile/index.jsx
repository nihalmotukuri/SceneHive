import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { FiEdit2 } from "react-icons/fi";
import './index.css';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { IoIosLogOut } from "react-icons/io";

const Profile = () => {
    const navigate = useNavigate()
    const [initialUsername, setInitialUsername] = useState('')
    const [initialEmail, setInitialEmail] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const token = Cookies.get('jwt_token')

    useEffect(() => {
        const fetchUserInfo = async () => {
            const url = `https://scenehive.onrender.com/api/user`
            const options = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            try {
                const res = await fetch(url, options)
                const data = await res.json()
                setInitialUsername(data.name)
                setInitialEmail(data.email)
                setUsername(data.name)
                setEmail(data.email)
            } catch (err) {
                console.error(err)
            }
        }

        fetchUserInfo()
    }, [token])

    const changeUsername = async () => {
        if (initialUsername === username) return toast.info("No changes made.")

        const url = `https://scenehive.onrender.com/api/user`
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: username
            })
        }

        try {
            const res = await fetch(url, options)

            res.ok
                ? toast.success("Username updated successfully!")
                : toast.error("Update failed.")

            const data = await res.json()
            console.log(data)
            setUsername(data.name)
        } catch (err) {
            console.error(err)
        }
    }

    const changeEmail = async () => {
        if (initialEmail === email) return toast.info("No changes made.")

        const url = `https://scenehive.onrender.com/api/user`
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email })
        }

        try {
            const res = await fetch(url, options)

            res.ok
                ? toast.success("Email updated successfully!")
                : toast.error("Update failed.")

            const data = await res.json()
            console.log(data)
            setEmail(data.email)
        } catch (err) {
            console.error(err)
        }
    }

    const onLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/login')
    }

    const deleteAccount = async () => {
        toast.warning("This action cannot be undone.")

        try {
            const res = await fetch('http://localhost:5000/api/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.ok) {
                toast.success("Your account has been deleted.")
                Cookies.remove('jwt_token')
                navigate('/signup')
            } else {
                toast.error("Failed to delete account. Please try again.")
            }
        } catch (err) {
            toast.error("An error occurred while deleting account.")
            console.error(err)
        }
    }

    return (
        <>
            <Header />

            <main className="profile-section">
                <h1 className="heading">ACCOUNT SETTINGS</h1>

                <section className="profile-settings">
                    <h3 className="heading">PROFILE</h3>

                    <div>
                        <label htmlFor="username">Username</label>

                        <div>
                            <input
                                type="text"
                                id="username"
                                name="user_field"
                                autoComplete="off"
                                readOnly
                                onFocus={(e) => e.target.removeAttribute('readOnly')}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                placeholder="username"
                            />
                            <button onClick={changeUsername}>
                                <FiEdit2 />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>

                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email_field"
                                autoComplete="off"
                                readOnly
                                onFocus={(e) => e.target.removeAttribute('readOnly')}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="email"
                            />
                            <button onClick={changeEmail}>
                                <FiEdit2 />
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            margin: '0',
                            width: '360px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                        <button
                            className="delete-btn"
                            onClick={deleteAccount} >Delete Account</button>
                    </div>

                    {/* <div>
                        <label htmlFor="new-password">Change Password</label>

                        <form autoComplete="off">
                            <input
                                type="text"
                                style={{ display: "none" }}
                            />
                            <input
                                type="password"
                                id="new-password"
                                name="change_pass_field"
                                autoComplete="new-password"
                                readOnly
                                onFocus={(e) => e.target.removeAttribute('readOnly')}
                            />
                            <button>
                                <FiEdit2 />
                            </button>
                        </form>
                    </div>

                    <div>
                        <label htmlFor="confirm-password">Confirm Password</label>

                        <form autoComplete="off">
                            <input
                                type="text"
                                style={{ display: "none" }}
                            />
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm_pass_field"
                                autoComplete="new-password"
                                readOnly
                                onFocus={(e) => e.target.removeAttribute('readOnly')}
                            />
                            <button>
                                <FiEdit2 />
                            </button>
                        </form>
                    </div> */}
                </section>

                <div className="logout-cont">
                    <button onClick={onLogout}>
                        <IoIosLogOut style={{ fontSize: '20px' }} /> Log out
                    </button>
                </div>
            </main>
        </>
    );
};

export default Profile;

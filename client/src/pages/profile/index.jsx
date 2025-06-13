import Header from "../../components/Header";
import { FiEdit2 } from "react-icons/fi";
import './index.css';

const Profile = () => {
    return (
        <>
            <Header />

            <main>
                <h1 className="heading">ACCOUNT SETTINGS</h1>

                <section className="profile-settings">
                    <h3 className="heading">PROFILE</h3>

                    <div>
                        <label htmlFor="username">Username</label>

                        <form autoComplete="off">
                            <input
                                type="text"
                                id="username"
                                name="user_field"
                                autoComplete="off"
                                readOnly
                                onFocus={(e) => e.target.removeAttribute('readOnly')}
                            />
                            <button>
                                <FiEdit2 />
                            </button>
                        </form>
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>

                        <form autoComplete="off">
                            <input
                                type="email"
                                id="email"
                                name="email_field"
                                autoComplete="off"
                                readOnly
                                onFocus={(e) => e.target.removeAttribute('readOnly')}
                            />
                            <button>
                                <FiEdit2 />
                            </button>
                        </form>
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
            </main>
        </>
    );
};

export default Profile;

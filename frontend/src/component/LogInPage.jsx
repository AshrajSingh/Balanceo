import '../styleSheets/loginPage.css'
import SigninPage from '../component/SignInPage';
import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import toast from 'react-hot-toast';
import { logInUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { authAtom, logInAtom } from '../store/userAtom';


export default function LoginPage() {

    console.log("Load Login Page");
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const setAuth = useSetRecoilState(authAtom)
    const setLogin = useSetRecoilState(logInAtom);
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate()

    function handleInputChange(e, ref) {
        ref.current = e.target.value
    }

    function setUserdetails() {
        const userData = {
            email: emailRef.current,
            password: passwordRef.current
        };
        return userData
    }

    async function loginUser() {
        setIsLoading(true);
        const userData = setUserdetails()

        try {
            if (!userData.email || !userData.password) {
                setIsLoading(false)
                toast.error("email or password is empty");
                return;
            }

            const response = await logInUser(userData)
            console.log("Response: ", response)

            setLogin(userData)

            navigate("/dashboardPage")

            localStorage.setItem("user", JSON.stringify({
                user_id: response.user_id,
                user: userData.email,
                username: response.username,
                token: response.token
            }))

            setAuth({ isLoggedIn: true, isChecked: true, user: userData.email })
            localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true, user: userData.email }))


            toast.success(response.message || 'Login Successful')

        } catch (error) {
            setIsLoading(false)
            toast.error('Login Failed' + (error.message ? `: ${error.message}` : ''));
            console.error("Login error: ", error)
        }
    }

    return (
        <>
            <div className="flip-card">
                <div className={`flip-card-inner${isFlipped ? " flipped" : ""}`}>
                    <div className="flip-card-front">
                        <div className="login-wrapper">
                            <div className="login-box">
                                <h2 className="login-title">log in</h2>

                                {/*  Input fields for login */}
                                <input className="login-input" type="text" placeholder="Email" onChange={(e) => handleInputChange(e, emailRef)} />
                                <input className="login-input" type="password" placeholder="Password" onChange={(e) => handleInputChange(e, passwordRef)} />

                                <div className="login-options">
                                    {/* <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label> */}
                                    <button className="forgot-password">Forgot Password ?</button>
                                </div>
                                {/* add loading state to login button */}
                                <button className="login-button" onClick={loginUser}> {isLoading ? 'Loading...' : 'LOGIN'} </button>

                                <p className="register-text">
                                    Don't have an account ? <button className="register-link" onClick={() => setIsFlipped(true)}>Sign up</button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flip-card-back">
                        <SigninPage onBack={() => setIsFlipped(false)} />
                    </div>

                </div>
            </div>

        </>
    );
}

import '../styleSheets/LoginPage.css' // CSS in the next section
import SigninPage from '../component/SignInPage'; // Assuming you have a SigninPage component
import { useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authAtom, logInAtom } from '../store/userAtom';
import toast from 'react-hot-toast';
import { logInUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {

    console.log("Load Login Page");
    const [isFlipped, setIsFlipped] = useState(false);
    const [auth, setAuth] = useRecoilState(authAtom)
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
        setLogin(userData)
        return userData
    }

    async function loginUser() {
        const userData = setUserdetails()

        try {
            if (!userData.email || !userData.password) {
                toast.error("email or password is empty");
                return;
            }

            const response = await logInUser(userData)
            console.log("After response");

            localStorage.setItem("user", JSON.stringify({
                isLoggedIn: true,
                user: userData.email
            }))
            
            setAuth({isLoggedIn: true, user: userData.email})

            navigate("/dashboard")

            toast.success(response.message || 'Login Successful')

        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }

    return (
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
                                <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label>
                                <button className="forgot-password">Forgot Password</button>
                            </div>

                            <button className="login-button" onClick={loginUser}>LOGIN</button>

                            <p className="register-text">
                                Don't have an account? <button className="register-link" onClick={() => setIsFlipped(true)}>Sign up</button>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flip-card-back">
                    <SigninPage onBack={() => setIsFlipped(false)} /> {/* Pass a callback to go back to login */}
                    {/* The SigninPage component can be imported and used here */}
                    {/* You can also add a button to go back to the login page */}
                </div>

            </div>
        </div>

    );
}
   
import { useRecoilState, useSetRecoilState } from 'recoil'
import '../styleSheets/loginPage.css'
import { authAtom, signUpAtom } from '../store/userAtom'
import { signInUser } from '../services/authService';
import toast from 'react-hot-toast';
import { signInSchema } from '../validations/userValidation';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

export default function SignInPage({ onBack }) {
    const [signIn, setSignIn] = useRecoilState(signUpAtom);
    const setAuth = useSetRecoilState(authAtom);
    const [isLoading, setIsLoading] = useState(false);
    const usernameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const navigate = useNavigate()

    { console.log("Load Sign In Page") }

    function handleInputChange(e, ref) {
        ref.current = e.target.value
    }

    function setUserdetails() {
        const userData = {
            username: usernameRef.current,
            email: emailRef.current,
            password: passwordRef.current
        };
        return userData
    }

    async function registerUser() {
        setIsLoading(true);
        const userData = setUserdetails()
        console.log("Registering user:", userData);

        try {
            if (!userData.username || !userData.email || !userData.password) {
                setIsLoading(false)
                toast.error('Please fill in all fields');
                return;
            }

            //validate inputs (validation logic)
            const isValidData = signInSchema.safeParse(userData);

            if (!isValidData.success) {
                setIsLoading(false)
                // Show validation errors using toast
                isValidData.error.issues.map((err) => toast.error(err.message));
                return; // Stop execution if validation fails
            }

            // If validation passes, send to server
            const response = await signInUser(userData)
            console.log("signin Response: ", response)

            
            // console.log("signin userId: ", user_id)
            localStorage.setItem("user", JSON.stringify({
                isLoggedIn: true,
                username: userData.username,
                user_id: response.user_id,
                token: response.token
            }))
            
            setAuth({ isLoggedIn: true, isChecked: true, user: userData.email })
            
            navigate("/dashboard")
            toast.success(response.message || 'User signed in successfully');

        } catch (error) {
            setIsLoading(false)
            toast.error(error.message || 'Something went wrong');
        }
    }

    return <div>
        <div className="signin-box">
            <h2 className="login-title">Sign In</h2>

            <input className="login-input" type="text" placeholder="Username" onChange={(e) => { handleInputChange(e, usernameRef) }} />
            <input className="login-input" type="email" placeholder="Email" onChange={(e) => { handleInputChange(e, emailRef) }} />
            <input className="login-input" type="password" placeholder="Create Password" onChange={(e) => { handleInputChange(e, passwordRef) }} />


            <button className="login-button" onClick={registerUser} disabled={isLoading}> {isLoading ? 'Loading...' : 'SIGN UP'} </button>

            <p className="register-text">
                Already have an account? <button className="register-link" onClick={onBack}>Log in</button>
            </p>
        </div>
    </div>
}
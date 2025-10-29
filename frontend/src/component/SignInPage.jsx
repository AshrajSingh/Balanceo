import { useRecoilState, useSetRecoilState } from 'recoil'
import '../styleSheets/loginPage.css'
import { authAtom, signUpAtom } from '../store/userAtom'
import { signInUser } from '../services/authService';
import toast from 'react-hot-toast';
import { signInSchema } from '../validations/userValidation';
import { useNavigate } from 'react-router-dom';

export default function SignInPage({ onBack }) {
    const [signIn, setSignIn] = useRecoilState(signUpAtom);
    const setAuth = useSetRecoilState(authAtom);
    const navigate = useNavigate()

    { console.log("Load Sign In Page") }

    function handleInputChange(field, value) {
        // Handle input changes if needed
        setSignIn(prev => ({
            ...prev,
            [field]: value
        }))
    }

    async function registerUser() {
        // Handle user registration logic
        console.log("Registering user:", signIn);
        try {
            if (!signIn.username || !signIn.email || !signIn.password) {
                toast.error('Please fill in all fields');
                return;
            }
            
            //validate inputs (validation logic)
            const isValidData = signInSchema.safeParse(signIn);

            if (!isValidData.success) {
                // Show validation errors using toast
                isValidData.error.issues.map((err) => toast.error(err.message));
                return; // Stop execution if validation fails
            }

            // If validation passes, send to server
            const response = await signInUser(signIn)
            console.log("signin Response: ", response)

            // console.log("signin userId: ", user_id)
            localStorage.setItem("user", JSON.stringify({
                isLoggedIn: true,
                username: signIn.username,
                user_id: response.user_id,
                token: response.token
            }))

            setAuth({isLoggedIn: true, isChecked: true, user: signIn.email})
            navigate("/dashboard")
            
            toast.success(response.message || 'User signed in successfully');

        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        }
    }

    return <div>
        <div className="signin-box">
            <h2 className="login-title">Sign In</h2>

            <input className="login-input" type="text" placeholder="Username" onChange={(e) => { handleInputChange('username', e.target.value) }} />
            <input className="login-input" type="email" placeholder="Email" onChange={(e) => { handleInputChange('email', e.target.value) }} />
            <input className="login-input" type="password" placeholder="Create Password" onChange={(e) => { handleInputChange('password', e.target.value) }} />


            <button className="login-button" onClick={registerUser}>SIGN IN</button>

            <p className="register-text">
                Already have an account? <button className="register-link" onClick={onBack}>Log in</button>
            </p>
        </div>
    </div>
}
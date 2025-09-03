import express from 'express';
import { User } from '../models/user.js';
const app = express();

app.use(express.json());
const router = express.Router()


router.post('/signIn', async function (req, res) {
    const { username, email, password } = req.body;  // Destructure for cleaner code
    
    try {

        const existingUser = await User.findOne({ email: email })

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({
            username: username,
            email: email,
            password: password
        });

        await user.save()
        res.status(201).json({ message: 'User signed in successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error signing in user' });
    }
})

// Add this at the end of your file
export default router
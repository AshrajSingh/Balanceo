import express from 'express';
import { User } from '../models/user.js';
const app = express();
app.use(express.json());
const router = express.Router()



router.post('/login', async function (req, res) {
    const { email, password } = req.body;
 

    try {
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            return res.status(400).json({ message: 'Could not find Email' })
        }
        if(existingUser.password !== password){
            return res.status(400).json({message: 'Password is Incorrect'})
        }
        res.json({ message: 'logIn successful' })
    } catch (error) {
        res.status(400).json({error})
    }
    //check if the user data is present in database, if there, show home page else navigate to signUp page

})

export default router;
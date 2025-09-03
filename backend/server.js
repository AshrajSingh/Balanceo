import cors from 'cors'
import express from 'express'
import logInRoutes from './routes/logInLogic.js'
import signInRoutes from './routes/signInLogic.js'
import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();


const app = express()
app.use(express.json())
app.use(cors());

app.use('/api',logInRoutes)
app.use('/api',signInRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));


const PORT = 5000;
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
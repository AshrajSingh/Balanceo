import cors from 'cors'
import express from 'express'
import logInRoutes from './routes/logInLogic.js'
import signInRoutes from './routes/signInLogic.js'
import expensesRoutes from './routes/expenses.js'
import incomeRoutes from './routes/incomes.js'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express()
app.use(express.json())
app.use(cors(({origin: ['http://localhost:5173', 'https://balanceo-fhz1.onrender.com']})));

app.use('/api', logInRoutes)
app.use('/api', signInRoutes)
app.use('/api', expensesRoutes)
app.use('/api', incomeRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));


const PORT = 5000;
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});


app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('/*path', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


import cors from 'cors'
import express from 'express'
import logInRoutes from './routes/logInLogic'
import signInRoutes from './routes/signInLogic'
import expensesRoutes from './routes/expenses'
import incomeRoutes from './routes/incomes'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import path from 'path'

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
const PORT = process.env.PORT;

const app = express()

app.use(express.json())
app.use(cors(({origin: ['http://localhost:5173', 'https://balanceo-fhz1.onrender.com']})));

app.use('/api', logInRoutes)
app.use('/api', signInRoutes)
app.use('/api', expensesRoutes)
app.use('/api', incomeRoutes)

if (!mongoUrl) {
  console.error('MONGO_URL environment variable is not set');
  process.exit(1);
}

mongoose.connect(mongoUrl)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('/*path', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
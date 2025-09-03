// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styleSheets/expenseGraph.css'
import Graph from './GraphWrapper';
import TotalExpense from '../component/TotalExpense';
import ExpenseTable from '../component/ExpenseTable';

export default function MonthlyExpensesChart() {
  return (
    <div style={{display: 'flex', margin:'auto 120px'}}>
      <Graph>
        <TotalExpense />
      </Graph>
      <ExpenseTable />
    </div>
  );
}

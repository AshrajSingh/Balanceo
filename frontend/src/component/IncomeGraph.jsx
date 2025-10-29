import Graph from "../wrappers/GraphWrapper";
import Income_Graph from "../wrappers/IncomeGraph.jsx";
import IncomeTable from "./IncomeTable.jsx";
import '../styleSheets/TableWrapper.css'
import '../styleSheets/expenseGraph.css'

export default function IncomeGraph() {
    return <div className='expenseGraph2' >
        <Graph>
            <Income_Graph />
        </Graph>
        <IncomeTable />
    </div>
}
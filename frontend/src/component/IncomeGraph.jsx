import Graph from "../wrappers/GraphWrapper";
import Income_Graph from "../wrappers/IncomeGraph.jsx";
import IncomeTable from "./incomeTable.jsx";

export default function IncomeGraph(){
    return <div style={{display: 'flex', margin:'70px 120px'}}>
        <IncomeTable />
        <Graph>
            <Income_Graph />
        </Graph>
    </div>
}
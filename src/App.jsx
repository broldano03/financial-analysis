import { useState } from "react"
import { IncomeStatement } from './components/IncomeStatement'
import './index.css'
import AnalysisIncome from "./components/AnalysisIncome";

function App() {

  const [financialData, setFinancialData] = useState(null);

  const handleFormSubmit = (data) => {
    setFinancialData(data);
  };

  return (
    <>
      <IncomeStatement onSubmit={handleFormSubmit}/>
      {financialData && <AnalysisIncome financialData={financialData} />}
    </>
  )
}

export default App

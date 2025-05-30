import { useEffect, useMemo } from "react"
import { BudgetForm } from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import { BudgetTracker } from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import { ExpenseList } from "./components/ExpenseList"
import { FilterByCategory } from "./components/FilterByCategory"


function App() {
  //traigo el estado y el dispatch del contexto
  const {state} = useBudget()
  //controlo que el presupuesto sea mayor a 0 para mostrar el componente de presupuesto
  const isValidBudget = useMemo (() => state.budget > 0, [state.budget])

  useEffect(() => {
    //busco el budget y los gastos en el localstorage y los guardo
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  },[state])

  return (
    <>
    {/* HEADER DE LA PAGINA */}
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-white text-4xl"
          >control de gastos
        </h1>
      </header>

      {/* CONTENEDOR DEL FORMULARIO Y BUDGET TRACKER */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg mt-10 p-10 shadow-lg">
        {isValidBudget? <BudgetTracker/> : <BudgetForm/>}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          {/* filtrar los gastos */}
          <FilterByCategory/>

          {/* lista de gastos */}
          <ExpenseList/>

          {/* boton para expandir el modal de gastos */}
          <ExpenseModal/>
        </main>
      )} 



    </>
  )
}

export default App

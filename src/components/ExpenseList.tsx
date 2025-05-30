import { useBudget } from "../hooks/useBudget"
import { useMemo } from "react"
import { ExpenseItem } from "./ExpenseItem"



export const ExpenseList = () => {
    const {state} = useBudget()

    //si tengo algun filtro de gastos activo, hago un array con los gastos en esa categoria
    //si no tengo ninguno activo, retorno todos los gastos
    const filteredExpense = state.filterCategory? 
    state.expenses.filter(exp => exp.category === state.filterCategory)
    : state.expenses

    //reviso si tengo algo en mi lista de gastos
    const isEmpty = useMemo(()=> filteredExpense.length === 0, [filteredExpense])
    
    return (
      <>
        <div className="bg-white mt-10 shadow-lg p-10">
          {/* si no hay gastos, se muestra un mensaje */}
          {isEmpty ? (
            <p className="text-gray-600 text-2xl font-bold text-center">No Hay Gastos</p>
          ) : (
            <>
              <p className="text-gray-600 text-2xl font-bold my-2">
                Listado De Gastos
              </p>
              {filteredExpense.map(expense => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
              />
              ))}
            </>
          )}
          
          
        </div>
      </>
    );
}


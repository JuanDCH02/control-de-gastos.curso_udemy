import { useReducer,createContext,type Dispatch, useMemo } from "react"
import { BudgetReducer, InitialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

type BudgetContextProps= {
  state: BudgetState,
  dispatch: Dispatch<BudgetActions>,
  totalExpenses: number,
  budgetLeft: number
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps) 

export const BudgetProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(BudgetReducer, InitialState)//calculo el total de gastos
    const totalExpenses= useMemo(() => state.expenses.reduce((total, expense) => 
        total + expense.amount, 0),[state.expenses])
    //calculo el presupuesto disponible
    const budgetLeft = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses])

  return (
    <BudgetContext.Provider value={
      {
        state, 
        dispatch, 
        totalExpenses, 
        budgetLeft
      }}>
        {children}
    </BudgetContext.Provider>
  )
}

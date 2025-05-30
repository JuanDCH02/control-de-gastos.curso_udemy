import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {

    //controlo que el contexto este disponible
    const context = useContext(BudgetContext)
    if (!context) {
        throw new Error('useBudget must be used within a BudgetProvider')
    }
    return context
}

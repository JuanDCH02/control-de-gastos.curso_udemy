import type { Expense } from "../types"
import { formatDate } from "../helpers"
import { AmountDisplay } from "./AmountDisplay"
import { useMemo } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

//dependencias del efecto deslizante
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

type ExpenseItemProps = {
    expense: Expense
}

export const ExpenseItem = ({expense}: ExpenseItemProps) => {
  const {dispatch} = useBudget()


  const categoryInfo =  useMemo(()=> categories.filter( cat => cat.id === expense.category)[0], [expense])
  const leadingActions = () => (
      <LeadingActions>
        <SwipeAction onClick={() => dispatch({type:'get-expense', payload:{id: expense.id}})}
          >actualizar
        </SwipeAction>
      </LeadingActions>
    )
  const trailingActions = () => (
      <TrailingActions>
        <SwipeAction
          destructive={true}
          onClick={() => dispatch({type: 'delete-expense', payload: {id: expense.id}})}
          >eliminar
        </SwipeAction>
      </TrailingActions>
    )

  return(
    <SwipeableList>
      <SwipeableListItem maxSwipe={30} leadingActions={leadingActions()} trailingActions={trailingActions()}>
      <div className="bg-white p-6 w-full border-b border-gray-200 flex gap-5 items-center relative overflow-hidden">
          <div>
            <img src={`/icono_${categoryInfo.icon}.svg`} alt={categoryInfo.name} className="w-20"/>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>

          <AmountDisplay 
            label=""
            amount={expense.amount}
          />
      </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

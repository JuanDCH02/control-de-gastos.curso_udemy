import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { AmountDisplay } from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"
import 'react-circular-progressbar/dist/styles.css'

export const BudgetTracker = () => {

    const {state, dispatch, totalExpenses, budgetLeft} = useBudget()
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(1)
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* COMPONENTE DE LA GRAFICA */}
        <div className="flex justify-center">
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage === 100? '#dc2626' : '#3b82f6',    
                    textSize: '10',
                    textColor: percentage === 100? '#dc2626' : '',
                    })}
                text={`${percentage}% Gastado`}
            />
        </div>

        {/* BOTON REINICIAR PRESUPUESTO */}
        <div className="flex flex-col justify-center items-center gap-8">
            <button className="uppercase w-full bg-pink-600 text-white p-2 rounded-lg  
            font-bold hover:cursor-pointer "
            type="button" onClick={() => dispatch({type:'reset-budget'})}
                >resetear presupuesto
            </button>

            {/* MUESTRA LOS MONTOS DE PRESUPUESTO, DISPONIBLE Y GASTADO */}
            <AmountDisplay
                label = 'presupuesto'
                amount = {state.budget}
            />
            <AmountDisplay
                label = 'gastado'
                amount = {totalExpenses}
            />
            <AmountDisplay
                label = 'disponible'
                amount = {budgetLeft}
            />

        </div>
    </div>
  )
}

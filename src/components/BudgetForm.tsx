import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export const BudgetForm = () => {

    const [budget, setBudget] = useState(0)
    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //controlo el cambio de valor del input 
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo (() => {
        //controlo que el presupuesto no sea un numero o que no sea positivo
        return isNaN(budget) || budget < 1
    }, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //hago el envio del formulario con mi reducer
        e.preventDefault()
        dispatch({ type: 'add-budget', payload: {budget} })
    }

    return (
        //header del formulario
    <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5 ">
            <label htmlFor="budget" className="text-4xl font-bold text-blue-600 text-center capitalize">
                definir presupuesto 
            </label>
            <input  className="w-full bg-white border border-gray-200 p-2" 
            type="number" placeholder="ingrese el presupuesto" 
            id="budget" value={budget} onChange={handleChange}/>
        </div>
        
        {/* boton del formulario */}
        <input className="bg-blue-600 hover:bg-blue-800 text-white w-full p-2 font-black 
        uppercase cursor-pointer disabled:opacity-40"
        type="submit" value='definir presupuesto' disabled={isValid}/>

    </form>
  )
}
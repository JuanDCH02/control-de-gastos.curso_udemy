import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import { useEffect, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


import type { DraftExpense, Value } from "../types";
import type {ChangeEvent, FormEvent} from 'react'

{/* Importaciones de estilos del date picker*/}
import "react-date-picker/dist/DatePicker.css";
import 'react-calendar/dist/Calendar.css';




export const ExpenseForm = () => {

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName:'',
    amount: 0, 
    category: '',
    date: new Date()
  })

  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const {state,dispatch, budgetLeft} = useBudget()

  useEffect(() => {
    //si existe un gasto para editar, se obtiene el gasto y se setea en el estado y se muestra el modal
    if(state.expenseToEdit){
      const editingExpense = state.expenses.filter(expense => expense.id === state.expenseToEdit)[0]
      setExpense(editingExpense)
      //guardo el gasto anterior para calcular la diferencia con el nuevo valor
      setPreviousAmount(editingExpense.amount)
    } 
  }, [state.expenseToEdit])

  const handleChangeDate = (date:Value) =>{
    setExpense({
      ...expense,
      date:date
    })
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) =>{
    //obtengo el nombre y el valor del input
    const {name, value} = e.target
    setExpense({
      ...expense,
      //si el nombre es amount, se convierte a numero, si no, escribo como string
      [e.target.name]: name==='amount'? Number(value): value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //valido si hay algun campo vacio
    if(expense.expenseName === '' || expense.amount === 0 || expense.category === ''){
      setError('Todos los campos son requeridos')
      return
    }
    //si edito un gasto le resto el valor anterior y 
    // valido si es mayor al presupuesto disponible
    if((expense.amount - previousAmount) > budgetLeft){
      setError('El gasto no puede ser mayor al presupuesto disponible')
      return
    }
    //AGREGO O ACTUALIZO EL GASTO
    if(state.expenseToEdit){
      //obtengo el id del gasto a editar(state.expenseToEdit) 
      //y el gasto con los nuevos datos(expense)
      dispatch({type: 'update-expense', payload: {expense: {id: state.expenseToEdit, ...expense}}})
    }else{
      dispatch({type: 'add-expense', payload: {expense}})
    }
    //cada vez que agrego o edito un gasto, reinicio el valor anterior
    //para que no se sume el gasto anterior al nuevo gasto
    setPreviousAmount(0)

  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* LEGEND */}
        <legend className="uppercase text-center text-2xl font-black border-b-3 border-blue-500 py-2"
          >{state.expenseToEdit? 'Editar gasto' : 'Añadir gasto'}
        </legend>

        {/* CONTROLO SI HAY ALGUN ERROR Y LO MUESTRO */
        error && <ErrorMessage> {error} </ErrorMessage>}

        {/* DIV NOMBRE GASTO */}
        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl"
            >Nombre Gasto:            
          </label>

          <input 
            type="text" 
            id="expenseName" 
            name="expenseName"
            placeholder="Añadir nombre gasto"
            className="p-1 bg-slate-100"
            value={expense.expenseName}
            onChange={handleChange}
          />
        </div>

        {/* DIV CANTIDAD GASTO */}
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl"
            >Cantidad:            
          </label>

          <input 
            type="number" 
            id="amount" 
            name="amount"
            placeholder="Añadir la cantidad del gasto"
            className="p-1 bg-slate-100"
            value={expense.amount}
            onChange={handleChange}
          />
        </div>

        {/* DIV SELECT CATEGORIA */}
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-xl"
            >Categoria:            
          </label>

          <select name="category" id="category" 
            className="p-2 bg-slate-100"
            value={expense.category}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoria</option>
            {categories.map( category => 
              <option value={category.id} key={category.id}
                >{category.name}
              </option>
            )}
          </select>
        </div>

        {/* DIV FECHA GASTO */}
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-xl"
            >Fecha del gasto:            
          </label>

            {/* SELECTOR DE FECHA */}
          <DatePicker
            id="date"
            className="p-2 border-0 bg-slate-100 "
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>

        {/* BOTON REGISTRAR GASTO */}
        <input type="submit" className="bg-blue-600 cursor-pointer text-white font-bold uppercase rounded-lg p-2 w-full" 
          value={state.expenseToEdit? 'Actualizar gasto' : 'Registrar gasto'}
        />
        
    </form>
  )
}

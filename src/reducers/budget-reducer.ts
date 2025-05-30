import type { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}} |
    {type: 'delete-expense', payload: {id: Expense['id']}} |
    {type: 'get-expense', payload: {id: Expense['id']}} |
    {type: 'update-expense', payload: {expense: Expense}} |
    {type: 'reset-budget'} |
    {type: 'add-filter-category', payload: {id: Category['id']}}

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    expenseToEdit: Expense['id']
    filterCategory: Category['id']
}

const initialBudget = ():number => {
    //OBTENGO EL BUDGET DEL LOCALSTORAGE
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? Number(localStorageBudget) : 0
}
const initialExpenes = ():Expense[] => {
    //OBTENGO LOS GASTOS DEL LOCALSTORAGE
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const InitialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenes(),
    expenseToEdit: '',
    filterCategory: ''
}

const createExpense = (expense: DraftExpense): Expense => {
    //obtengo los datos del gasto y le añado un id
    return {
        ...expense,
        id: uuidv4()
    }
}

export const BudgetReducer = (state: BudgetState = InitialState, action: BudgetActions) => {
    switch (action.type) {
        case 'add-budget':
            return {
                //RETORNO EL ESTADO ACTUAL Y ACTUALIZO EL BUDGET
                ...state,
                budget: action.payload.budget
                
            }
        case 'show-modal':
            return {
                //RETORNO EL ESTADO ACTUAL Y ACTIVO EL MODAL
                ...state,
                modal: true
            }
        case 'close-modal':
            return {
                //RETORNO EL ESTADO ACTUAL Y DESACTIVO EL MODAL
                ...state,
                modal: false,
                expenseToEdit: ''
            }
        case 'add-expense':
            return{
                ...state,
                //AGREGO EL GASTO AL ARRAY DE GASTOS
                expenses:[...state.expenses, createExpense(action.payload.expense)],
                modal: false 
            }
        case 'delete-expense':
            return{
                //ELIMINO EL GASTO DEL ARRAY DE GASTOS
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            }
        case 'get-expense':
            return{
                //guardo el id del gasto a editar y activo el modal
                ...state,
                expenseToEdit: action.payload.id,
                modal: true
            }
        case 'update-expense':
            return{
                ...state,
                //busco el gasto a editar y actualizo los datos
                expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
                expenseToEdit: '',
                modal: false
            }
        case 'reset-budget':
            return{
                ...state,
                budget: 0,
                expenses: [],
                expenseToEdit: ''
            }
        case "add-filter-category":
            return{
                //agrego el id de la categoria al filtro de la lista de gatos
                ...state,
                filterCategory: action.payload.id
            }
        default:
            return state
    }
}


import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export const FilterByCategory = () => {

    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        dispatch({type:'add-filter-category', payload: {id: e.target.value}})
    }

  return (
    <div className="bg-white shadow-lg p-10 w-full rounded-lg">
        <form action="">

            <div className="flex flex-row md:flex-row md:items-center gap-5">
                <label htmlFor="category">Filtrar Gastos</label>
                <select 
                    id="category"
                    className="bg-slate-100 p-3 flex-1 rounded"
                    onChange={handleChange}>
                    <option value="">-- Todas las Categorias --</option>
                    {
                        categories.map(category =>(
                            <option 
                            value={category.id}
                            key={category.id}
                                >{category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

        </form>
    </div>
  )
}

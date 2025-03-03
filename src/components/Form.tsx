
import { useState, ChangeEvent, FormEvent, ActionDispatch, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"
import { Activity } from "../types"

type FormProps = {
    dispatch: ActionDispatch<[action: ActivityActions]>,
    state: ActivityState
}

const initialState:Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}

export const Form = ({ dispatch,state }: FormProps) => {

    const [activity, setActivity] = useState(initialState)

    useEffect(()=>{
        if(state.activeId){
            const getActivity = state.activities.filter(x=>x.id === state.activeId)[0]
            setActivity(getActivity)
        }
    },[state.activeId]) 


    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const numberInputField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: numberInputField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: { newActivity: activity } })
        setActivity({...initialState, id:uuidv4()})
    }

    return (
        <form className="space-y-5 bg-white shadow p-10  rounded-lg" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="category">Categoria:</label>
                <select className="border border-slate-300 p-2 rounded-lg w-full" id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {
                        categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="name">Actividad:</label>
                <input
                    id="name"
                    className="border border-slate-300 p-2 w-full rounded-lg"
                    type="text"
                    placeholder="Ej. Verduras, Hamburguesa, Pizza, Correr, Pesas, Aerobicos"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="calories">Calorias:</label>
                <input
                    id="calories"
                    className="border border-slate-300 p-2 w-full rounded-lg"
                    type="number"
                    placeholder="Ej. 400, 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <input
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 text-white font-bold text-lg uppercase cursor-pointer disabled:opacity-10"
                    value={`${activity.category === 1 ? 'guardar comida':'guadar ejercicio'}`}
                    disabled={!isValidActivity()}
                />
            </div>
        </form>
    )
}

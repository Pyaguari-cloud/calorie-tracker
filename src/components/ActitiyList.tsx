import { Activity } from "../types"
import { ActionDispatch } from "react"
import { ActivityActions } from "../reducers/activity-reducer"
import { categories } from "../data/categories"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"



type ActitiyListProps = {
    activities: Activity[],
    dispatch: ActionDispatch<[action: ActivityActions]>
}

export const ActivityList = ({ activities, dispatch }: ActitiyListProps) => {

    const categoryName = (category:Activity['category'])=> (
        categories.map( cat => cat.id === category ? cat.name : '' )
    )  

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comidas y Actividades</h2>
            {
                activities.length === 0 ? <p className="text-center my-10">No hay registros aún...</p> 
                :
                activities.map((activity) => (
                    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between items-center border border-slate-400">
                        
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(activity.category)}
                            </p>

                            <p className="text-2xl font-bold pt-5">
                                {activity.name}
                            </p>
                            <p className="font-black text-4xl text-lime-500">
                                {activity.calories} {''}
                                <span>Calorias</span>
                            </p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <button className="cursor-pointer" 
                            onClick={()=> dispatch({type:"set-activeId", payload:{id:activity.id}})}>
                                <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
                            </button>
                            <button className="cursor-pointer" 
                            onClick={()=> dispatch({type:"delete-activity", payload:{id:activity.id}})}>
                                <TrashIcon className="h-8 w-8 text-red-800"/>
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

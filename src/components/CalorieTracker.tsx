import { CaloriesDisplay } from "./CaloriesDisplay"
import { useActivity } from "../hooks/useActivity"

export const CalorieTracker = () => {

    const { caloriesConsumed, caloriesBurned, netCalories } = useActivity()

    //contadores
    
    return (
        <>
            <h2 className="text-center font-bold text-white text-4xl">
                Resumen de Calorias
            </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10 ">
                <CaloriesDisplay 
                calories={caloriesConsumed}
                text="Consumidas"
                />

                <CaloriesDisplay 
                calories={caloriesBurned}
                text="Quemadas"
                />

                <CaloriesDisplay 
                calories={netCalories}
                text="Diferencia"
                />
            </div>
        </>
    )
}

import { Form } from "./components/Form"
import { useEffect, useReducer } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import { ActivityList } from "./components/ActitiyList"
import { CalorieTracker } from "./components/CalorieTracker"

export const App = () => {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(()=>{
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])

  const canRestartApp = () => {
    return state.activities.length > 0
  }

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Calculadora de calorias</h1>
          <button 
          className="bg-gray-800 hover:bg-gray-900 p-2 font-bold text-white text-sm uppercase rounded-lg cursor-pointer disabled:opacity-10"
          disabled={!canRestartApp()}
          onClick={()=> dispatch({type:"restart-app"})}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
          activities={state.activities}
          />
        </div>
      </section>

      <section className="py-10 max-w-4xl mx-auto">
          <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
          />
      </section>
    </>
  )

}

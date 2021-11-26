import {applyMiddleware, combineReducers, createStore} from "redux";
import {AppReducer} from "./App-reducer";
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";


const rootReducer = combineReducers({
    AppPage:AppReducer
})

export let store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleware)))
export type AppRootStateType = ReturnType<typeof rootReducer>
type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U : never
export type InferActionsType<T extends {[key:string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

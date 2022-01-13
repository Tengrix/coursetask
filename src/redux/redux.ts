import {combineReducers} from "redux";
import {AppReducer} from "./App-reducer";
import thunkMiddleware from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    AppPage: AppReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

// @ts-ignore
window.store = store
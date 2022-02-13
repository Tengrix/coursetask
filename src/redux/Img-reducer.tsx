import {Dispatch} from "react";
import {imgAPI} from "../api/apiUnsplash";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataType} from "../types/Types";


export type InitialStateType = {
    find: boolean;
    totalCountOfImg: number;
    listOfImg: DataType[];
    pic: string;

}
const initialState: InitialStateType = {
    find: false,
    totalCountOfImg: 0,
    listOfImg: [],
    pic: '',
}

const slice = createSlice({
    name: 'AppReducer',
    initialState,
    reducers: {
        setListOfImages(state, action: PayloadAction<{ images: any }>) {
            state.listOfImg = action.payload.images
        },
        setTotalAmountOfImages(state, action: PayloadAction<{ total: number }>) {
            state.totalCountOfImg = action.payload.total
        },
        setFind(state, action: PayloadAction<{ value: boolean }>) {
            state.find = action.payload.value
        },
        setPic(state, action: PayloadAction<{ pic: string }>) {
            state.pic = action.payload.pic
        },


    }
})
export const {
    setListOfImages,
    setPic,
    setTotalAmountOfImages,
    setFind,
} = slice.actions
export const ImgReducer = slice.reducer

export const getCourseImages = (title: string, pageNumber: number, per_page: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await imgAPI.getImages(title, pageNumber, per_page)
            dispatch(setListOfImages({images: response.data.results}))
            dispatch(setTotalAmountOfImages({total: response.data.total}))
            dispatch(setFind({value: true}))
        } catch (e) {
            console.log(`error: ${e}`)
        }
    }
}
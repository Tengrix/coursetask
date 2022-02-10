import {Dispatch} from "react";
import {DataType, imgAPI} from "../api/api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type courseType = {
    id: number;
    name: string;
    description: string;
    price: number;
    dateOfBeginning: string;
    picOfCourse: string;
}
export type sortType = 'price-high' | 'price-low' | 'date'
export type AppInitialStateType = {
    course: courseType[];
    find: boolean;
    totalCountOfImg: number;
    listOfImg: DataType[];
    pic: string;
    sortTypes: sortType
}
const AppInitialState: AppInitialStateType = {
    course: [
        {
            id: 6,
            name: 'Java',
            description: 'LearnJava',
            price: 1000,
            dateOfBeginning: '2021-10-17',
            picOfCourse: 'https://www.comnews.ru/sites/default/files2019/articles/2021-02/Java.jpg'
        },
        {
            id: 1,
            name: 'JS',
            description: 'React',
            price: 100,
            dateOfBeginning: '2021-06-28',
            picOfCourse: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
        },
        {
            id: 2,
            name: 'Python',
            description: 'MachineLearning',
            price: 50,
            dateOfBeginning: '2020-05-8',
            picOfCourse: 'https://roboschool.pro/content/uploads/2020/06/python-940x940.png'
        },
        {
            id: 3,
            name: 'HTML',
            description: 'Tags',
            price: 80,
            dateOfBeginning: '2021-06-2',
            picOfCourse: 'https://media.proglib.io/wp-uploads/2019/03/html-output.jpg'
        },
        {
            id: 4,
            name: 'CSS',
            description: 'Styles',
            price: 105,
            dateOfBeginning: '2021-06-11',
            picOfCourse: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png'
        },
        {
            id: 5,
            name: 'TS',
            description: 'Types',
            price: 101,
            dateOfBeginning: '2020-10-5',
            picOfCourse: 'https://res.cloudinary.com/practicaldev/image/fetch/s--6McQQU7i--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/j4hwcf7lntmqyha7ras5.png'
        },
    ],
    find: false,
    totalCountOfImg: 0,
    listOfImg: [],
    pic: '',
    sortTypes: 'date'
}

const slice = createSlice({
    name: 'AppReducer',
    initialState: AppInitialState,
    reducers: {
        deleteCourse(state, action: PayloadAction<{ id: number }>) {
            const index = state.course.findIndex(el => el.id === action.payload.id)
            if(index > -1){
                state.course.splice(index,1)
            }
        },
        changeCourse(state,action:PayloadAction<{course:courseType, id:number}>){
            const index = state.course.findIndex(el => el.id === action.payload.id)
            state.course[index] = action.payload.course
            state.course[index].id = action.payload.id
        },
        addNewCourse(state, action: PayloadAction<{ name: string, price: number, date: string, description: string, pic: string }>) {
            const newCourse: courseType = {
                id: Math.random(),
                name: action.payload.name,
                description: action.payload.description,
                picOfCourse: action.payload.pic,
                price: action.payload.price,
                dateOfBeginning: action.payload.date
            }
            state.course.push({...newCourse})
        },
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
        setSort(state, action: PayloadAction<{ types: sortType }>) {
            state.sortTypes = action.payload.types
        },
        filterCourses(state, action: PayloadAction<{ course: courseType[], sort:sortType }>) {
            switch (action.payload.sort){
                case "price-low":
                    state.course = [...action.payload.course].sort((a, b) => a.price < b.price ? -1 : 1)
                    break;
                case "price-high":
                    state.course = [...action.payload.course].sort((a, b) => a.price > b.price ? -1 : 1)
                    break;
                case "date":
                    state.course = [...action.payload.course].sort((a, b) => {
                        return +new Date(a.dateOfBeginning) - +new Date(b.dateOfBeginning)
                    })
                    break;
                default:
                    return state
            }
        }
    }
})
export const {
    deleteCourse,
    addNewCourse,
    filterCourses,
    setListOfImages,
    setPic,
    setTotalAmountOfImages,
    setSort,
    setFind,
    changeCourse
} = slice.actions
export const AppReducer = slice.reducer

export const getCourseImages = (title: string, pageNumber: number, per_page: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await imgAPI.getImages(title, pageNumber, per_page)
            dispatch(setListOfImages({images: response.data.results}))
            dispatch(setTotalAmountOfImages({total: response.data.total}))
            dispatch(setFind({value: true}))
        } catch (e) {
            console.log(`error: ${e}` )
        }
    }
}
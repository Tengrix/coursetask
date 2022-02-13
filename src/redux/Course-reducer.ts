import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {courseType, sortType} from "../types/Types";
export type CourseInitialStateType = {
    course: courseType[];
    sortTypes: sortType;
    searchTitle:string;
}
const courseInitialState:CourseInitialStateType = {
    course:[
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
    sortTypes: 'date',
    searchTitle:''
}

export const slice = createSlice({
    name:'Course-reducer',
    initialState:courseInitialState,
    reducers:{
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
        },
        setSort(state, action: PayloadAction<{ types: sortType }>) {
            state.sortTypes = action.payload.types
        },
        setSearch(state,action:PayloadAction<{title:string}>){
            state.searchTitle = action.payload.title

        }
    }
})

export const {deleteCourse,changeCourse,addNewCourse,filterCourses,setSort,setSearch} = slice.actions
export const CourseReducer = slice.reducer
import {InferActionsType} from "./redux";
import {Dispatch} from "react";
import {DataType, imgAPI} from "../api/api";

export type courseType = {
    id: number;
    name: string;
    description: string;
    price: number;
    dateOfBeginning: string;
    picOfCourse: string;
}
export type sortType = 'price-high'|'price-low'|'date'
export type AppInitialStateType = {
    course:courseType[];
    find:boolean;
    totalCountOfImg:number;
    listOfImg:DataType[];
    pic:string;
    sortTypes:sortType
}
const AppInitialState:AppInitialStateType = {
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
    find:false,
    totalCountOfImg:0,
    listOfImg:[],
    pic:'',
    sortTypes:'date'
}


export const AppReducer = (state: AppInitialStateType = AppInitialState, action: ActionsType) => {
    switch (action.type) {
        case "EDIT":
            return {
                ...state,course:state.course.filter(el=>el.id !==action.id)
            }
        case "CHANGE-PRICE":
            debugger
            return {
                ...state, course:state.course.map(t => t.id === action.id ? {...t, price: action.value} : t)
            }
        case "CHANGE-DATE":
            return {
                ...state, course:state.course.map(t => t.id === action.id ? {...t, dateOfBeginning: action.date} : t)
            }
        case "CHANGE-DES":
            return {
                ...state, course:state.course.map(t => t.id === action.id ? {...t, description: action.des} : t)
            }
        case "ADD":
            const newCourse:courseType = {
                id:Math.random(),
                name:action.name,
                description:action.description,
                picOfCourse:action.pic,
                price:action.price,
                dateOfBeginning:action.date
            }
            return {
                ...state, course:[...state.course, newCourse]
            }
        case "SET-IMAGES":
            return {
                ...state, listOfImg:action.images
            }
        case "SET-TOTAL-IMAGES":
            return {
                ...state, totalCountOfImg:action.total
            }
        case "SET-FIND":
            return {
                ...state, find: action.value
            }
        case "SET-PIC":
            return {
                ...state, pic:action.pic
            }
        case "SET-COURSE-TYPE":
            return{
                ...state, course: action.course
            }
        case "SET-SORT":
            debugger
            return {
                ...state, sortTypes: action.types
            }
        default:
            return state
    }
}

type ActionsType = InferActionsType<typeof appActions>

export const appActions = {
    editCourseAc: (id: number) => {
        return {
            type: 'EDIT',
            id
        } as const
    },
    changePrice: (value: number, id: number) => {
        return {
            type: 'CHANGE-PRICE',
            value, id
        } as const
    },
    changeDate: (id: number, date: string) => {
        return {
            type: 'CHANGE-DATE',
            id, date
        } as const
    },
    changeDescription: (id: number, des: string) => {
        return {
            type: 'CHANGE-DES',
            id, des
        } as const
    },
    addCourse:(name: string, price: number, date: string, description: string, pic: string)=>{
        return{
            type:'ADD',
            name,price,date,description,pic
        } as const
    },
    setListOfImages:(images:any)=>{
        return{
            type:'SET-IMAGES',
            images
        } as const
    },
    setTotalAmountOfImages:(total:number)=>{
        return{
            type:'SET-TOTAL-IMAGES',
            total
        } as const
    },
    setFind:(value:boolean)=>{
        return{
            type:'SET-FIND',
            value
        } as const
    },
    setPic:(pic:string)=>{
        return{
           type:'SET-PIC',
           pic
        } as const
    },
    setSort:(types:sortType)=>{
        debugger
        return{
            type:'SET-SORT',
            types
        } as const
    },
    setCourses:(course:courseType[])=>{
        return{
            type:'SET-COURSE-TYPE',
            course
        }as const
    }
}

export const getCourseImages = (title: string, pageNumber: number, per_page: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await imgAPI.getImages(title,pageNumber,per_page)
            dispatch(appActions.setListOfImages(response.data.results))
            dispatch(appActions.setTotalAmountOfImages(response.data.total))
            dispatch(appActions.setFind(true))
        } catch (e) {

        }
    }
}
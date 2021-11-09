import React, {useEffect, useState} from 'react';
import './App.css';
import {Link, Route, Switch, useHistory} from "react-router-dom";
import Courses from "./Courses";
import Home from "./Home";
import NewCourse from "./NewCourse";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux";
import {appActions, AppInitialStateType, courseType, getCourseImages} from "./redux/App-reducer";
import {DataType} from "./api/api";

export type coursesStateType = {
    id: number;
    name: string;
    description: string;
    price: number;
    dateOfBeginning: string;
    picOfCourse: string;
}

function App() {
    // const [state, setState] = useState<coursesStateType[]>([
    // ])
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, courseType[]>(state => state.AppPage.course)
    const listOfImg = useSelector<AppRootStateType, DataType[]>(state => state.AppPage.listOfImg)
    const find = useSelector<AppRootStateType,boolean>(state=>state.AppPage.find)
    const totalCountOfImg = useSelector<AppRootStateType,number>(state => state.AppPage.totalCountOfImg)
    const pic = useSelector<AppRootStateType, string>(state => state.AppPage.pic)
    const [sortType, setSortType] = useState('price-high');
    // const [find, setFind] = useState<boolean>(false)
    // const [totalCountOfImg, setTotalCountOfImg] = useState<number>(1)
    // const [listOfImg, setListOfImg] = useState([])
    // const [pic, setPic] = useState<File>()
    console.log(state)

    useEffect(() => {
        // const sortByPrice = (type: any) => {
        //     switch (sortType) {
        //         case 'price-high':
        //             setState([...state].sort((a, b) => a.price > b.price ? -1 : 1))
        //             break;
        //         case 'price-low':
        //             setState([...state].sort((a, b) => a.price < b.price ? -1 : 1))
        //             break;
        //         case 'date':
        //             setState([...state].sort((a, b) => {
        //                 return +new Date(a.dateOfBeginning) - +new Date(b.dateOfBeginning)
        //             }))
        //             break;
        //         default:
        //             return state
        //     }
        // }
        // sortByPrice(sortType)
    }, [sortType])

    const editCourse = (id: number) => {
        dispatch(appActions.editCourseAc(id))
    }
    const changePrice = (value: number, id: number) => {
        dispatch(appActions.changePrice(value, id))
    }
    const changeDescription = (description: string, id: number) => {
        dispatch(appActions.changeDescription(id, description))
    }
    const changeDate = (date: string, id: number) => {
        dispatch(appActions.changeDate(id, date))
    }
    const addCourse = (name: string, price: number, date: string, description: string, pic: string) => {
        dispatch(appActions.addCourse(name, price, date, description, `${pic}`))
    }
    const uploadPic = (title: string, pageNumber: number, per_page: number) => {
        // axios.get(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=${per_page}&query=${title}&client_id=${clientId}`)
        //     .then(res => {
        //         setListOfImg(res.data.results)
        //         setTotalCountOfImg(res.data.total)
        //     })
        //     .catch(err => console.log(err));
        // setFind(true)
        // console.log(title)
        dispatch(getCourseImages(title, pageNumber, per_page))
    }
    const getPic = (id: string) => {
        debugger
        const newPic = listOfImg.filter((el: DataType) => el.id === id)
        // setListOfImg(newPic)
        // // @ts-ignore
        // setPic(newPic[0].urls.full)
        dispatch(appActions.setListOfImages(newPic))
        // @ts-ignore
        dispatch(appActions.setPic(newPic[0].urls.full))
        dispatch(appActions.setFind(false))
    }
    console.log(listOfImg)
    return (
        <div className={'App'}>
            <div className={'imgPlace'}>
                <img className="img-fluid"
                     src="https://media.foxford.ru/wp-content/uploads/2020/02/%D0%B8%D1%82%D0%B2%D1%83%D0%B7.jpg"
                     alt=""/>
                <h1 style={{color: "black"}} className="display-4">
                    IT-Courses
                </h1>
                <span>
                    <nav>
                        <Link to="/home" className={'mainMenu'}>Home</Link>
                    </nav>
                    <nav>
                        <Link to="/new-course" className={'mainMenu'}>New Course</Link>
                    </nav>
                        </span>
            </div>
            <div>
                <Switch>
                    <Route path="/home">
                        <Home
                            setSortType={setSortType}
                            courses={state}
                            editCourse={editCourse}
                        />
                    </Route>
                    <Route path="/course/:courseId">
                        <Courses
                            changePrice={changePrice}
                            changeDate={changeDate}
                            courses={state}
                            changeDescription={changeDescription}
                        />
                    </Route>
                    <Route path={'/new-course'}>
                        <NewCourse
                            uploadPic={uploadPic}
                            addCourse={addCourse}
                            find={find}
                            totalCountOfImg={totalCountOfImg}
                            listOfImg={listOfImg}
                            getPic={getPic}
                            pic={pic}
                        />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;

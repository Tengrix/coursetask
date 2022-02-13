import React, {useEffect} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Courses from "./Components/All Courses/Courses";
import MainPage from "./Components/MainPage/MainPage";
import NewCourse from "./Components/Create New Course/NewCourse";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux";
import {
    getCourseImages,
    setFind,
    setListOfImages,
    setPic,
} from "./redux/Img-reducer";
import Header from "./Components/Header/Header";
import {addNewCourse, changeCourse, deleteCourse, filterCourses, setSearch} from "./redux/Course-reducer";
import {courseType, DataType, sortType} from "./types/Types";
import s from './App.css'

function App() {
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, courseType[]>(state => state.CoursePage.course)
    const listOfImg = useSelector<AppRootStateType, DataType[]>(state => state.AppPage.listOfImg)
    const find = useSelector<AppRootStateType, boolean>(state => state.AppPage.find)
    const totalCountOfImg = useSelector<AppRootStateType, number>(state => state.AppPage.totalCountOfImg)
    const pic = useSelector<AppRootStateType, string>(state => state.AppPage.pic)
    const sortTypes = useSelector<AppRootStateType, sortType>(state => state.CoursePage.sortTypes)


    useEffect(() => {
        dispatch(filterCourses({course: state, sort: sortTypes}))
    }, [sortTypes])

    const delCourse = (id: number) => {
        dispatch(deleteCourse({id: id}))
    }
    const changeOldCourse = (course:courseType, id:number) => {
        dispatch(changeCourse({course,id}))
    }
    const addCourse = (name: string, price: number, date: string, description: string, pic: string) => {
        dispatch(addNewCourse({name: name, price: price, date: date, description: description, pic: `${pic}`}))
    }
    const uploadPic = (title: string, pageNumber: number, per_page: number) => {
        dispatch(getCourseImages(title, pageNumber, per_page))
    }
    const getPic = (id: string) => {
        const newPic = listOfImg.filter((el: DataType) => el.id === id)
        dispatch(setListOfImages({images: newPic}))
        dispatch(setPic({pic: newPic[0].urls.full}))
        dispatch(setFind({value: false}))
    }
    const searchCourse = (title:string) => {
        dispatch(setSearch({title}))
    }
    console.log(state)
    return (
        <div className={'App'}>
            <Header/>
            <div>
                <Switch>
                    <Route exact path="/">
                        <MainPage
                            sortTypes={sortTypes}
                            courses={state}
                            delCourse={delCourse}
                            searchCourse={searchCourse}
                        />
                    </Route>
                    <Route path="/course/:courseId">
                        <Courses
                            changeOldCourse={changeOldCourse}
                            courses={state}
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

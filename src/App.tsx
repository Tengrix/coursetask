import React, {useEffect} from 'react';
import './App.css';
import {Link, Route, Switch} from "react-router-dom";
import Courses from "./Courses";
import Home from "./Home";
import NewCourse from "./NewCourse";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux";
import {
    addNewCourse,
    changeDates,
    changeDescriptions,
    changePrices,
    courseType,
    deleteCourse,
    filterCourses,
    getCourseImages,
    setFind,
    setListOfImages,
    setPic,
    sortType
} from "./redux/App-reducer";
import {DataType} from "./api/api";


function App() {
    const dispatch = useDispatch()
    const state = useSelector<AppRootStateType, courseType[]>(state => state.AppPage.course)
    const listOfImg = useSelector<AppRootStateType, DataType[]>(state => state.AppPage.listOfImg)
    const find = useSelector<AppRootStateType, boolean>(state => state.AppPage.find)
    const totalCountOfImg = useSelector<AppRootStateType, number>(state => state.AppPage.totalCountOfImg)
    const pic = useSelector<AppRootStateType, string>(state => state.AppPage.pic)
    const sortTypes = useSelector<AppRootStateType, sortType>(state => state.AppPage.sortTypes)

    console.log(state)

    useEffect(() => {
        dispatch(filterCourses({course: state, sort: sortTypes}))
        console.log(sortTypes)
    }, [sortTypes])

    const delCourse = (id: number) => {
        dispatch(deleteCourse({id: id}))
    }
    const changePrice = (value: number, id: number) => {
        dispatch(changePrices({value, id}))
    }
    const changeDescription = (description: string, id: number) => {
        dispatch(changeDescriptions({id, des: description}))
    }
    const changeDate = (date: string, id: number) => {
        dispatch(changeDates({id, date}))
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
                            sortTypes={sortTypes}
                            courses={state}
                            delCourse={delCourse}
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

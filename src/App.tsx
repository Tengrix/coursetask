import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from "react-router-dom";
import Courses from "./Courses";
import Home from "./Home";
import NewCourse, {DataType} from "./NewCourse";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

export type coursesStateType = {
    id: number;
    name: string;
    description: string;
    price: number;
    dateOfBeginning: string;
    picOfCourse: string;
}

function App() {
    const [state, setState] = useState<coursesStateType[]>([
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
        {
            id: 6,
            name: 'Java',
            description: 'LearnJava',
            price: 1000,
            dateOfBeginning: '2021-10-17',
            picOfCourse: 'https://www.comnews.ru/sites/default/files2019/articles/2021-02/Java.jpg'
        },
    ])
    const [sortType, setSortType] = useState('price-high');
    const [find, setFind] = useState<boolean>(false)
    const [totalCountOfImg, setTotalCountOfImg] = useState<number>(1)
    const [listOfImg, setListOfImg] = useState([])
    const [pic, setPic] = useState<File>()
    const history = useHistory()
    let clientId = 'TjmARGkpjfymTRCvG-FSEMuhTEz4V6_oSpITSpqmmEg'


    useEffect(() => {
        const sortByPrice = (type: any) => {
            switch (sortType) {
                case 'price-high':
                    setState([...state].sort((a, b) => a.price > b.price ? -1 : 1))
                    break;
                case 'price-low':
                    setState([...state].sort((a, b) => a.price < b.price ? -1 : 1))
                    break;
                case 'date':
                    setState([...state].sort((a, b) => {
                        return +new Date(a.dateOfBeginning) - +new Date(b.dateOfBeginning)
                    }))
                    break;
                default:
                    return state
            }
        }
        sortByPrice(sortType)
    }, [sortType])

    const editCourse = (id: number) => {
        const newArr = [...state].filter((el) => el.id !== id)
        setState(newArr)
    }
    const changePrice = (value: number, id: number) => {
        let newArray = state
            .map(t => t.id === id ? {...t, price: value} : t);
        setState(newArray)
    }
    const changeDescription = (description: string, id: number) => {
        let newArray = state
            .map(t => t.id === id ? {...t, description} : t);
        setState(newArray)
    }
    const changeDate = (date: string, id: number) => {
        let newArray = state
            .map(t => t.id === id ? {...t, dateOfBeginning: date} : t);
        setState(newArray)
    }
    const addCourse = (name: string, price: number, date: string, description: string, pic: string) => {
        let newCourse: coursesStateType = {
            id: Math.random(),
            name,
            price,
            picOfCourse: pic,
            dateOfBeginning: date,
            description
        }
        setState([...state, newCourse])
    }
    const uploadPic = (pic: string, title: string, pageNumber: number, per_page: number) => {
        axios.get(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=${per_page}&query=${title}&client_id=${clientId}`)
            .then(res => {
                setListOfImg(res.data.results)
                setTotalCountOfImg(res.data.total)
            })
            .catch(err => console.log(err));
        setFind(true)
    }
    const getPic = (id: string) => {
        const newPic = listOfImg.filter((el: DataType) => el.id === id)
        setListOfImg(newPic)
        // @ts-ignore
        setPic(newPic[0].urls.full)
        setFind(false)

    }
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

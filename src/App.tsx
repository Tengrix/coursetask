import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Course from "./Course";
import Home from "./Home";

export type coursesStateType = {
    id: number;
    name: string;
    description: string;
    price: number;
    dateOfBeginning: string;
    picOfCourse:string;
}

function App() {
    const [state, setState] = useState<coursesStateType[]>([
        {id: 1, name: 'JS', description: 'React', price: 100, dateOfBeginning: '2021-06-28', picOfCourse:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'},
        {id: 2, name: 'Python', description: 'MachineLearning', price: 50, dateOfBeginning: '2020-05-8', picOfCourse:'https://roboschool.pro/content/uploads/2020/06/python-940x940.png'},
        {id: 3, name: 'HTML', description: 'Tags', price: 80, dateOfBeginning: '2021-06-2', picOfCourse:'https://media.proglib.io/wp-uploads/2019/03/html-output.jpg'},
        {id: 4, name: 'CSS', description: 'Styles', price: 105, dateOfBeginning: '2021-06-11', picOfCourse:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png'},
        {id: 5, name: 'TS', description: 'Types', price: 101, dateOfBeginning: '2020-10-5', picOfCourse:'https://res.cloudinary.com/practicaldev/image/fetch/s--6McQQU7i--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/j4hwcf7lntmqyha7ras5.png'},
        {id: 6, name: 'Java', description: 'LearnJava', price: 1000, dateOfBeginning: '2021-10-17', picOfCourse:'https://www.comnews.ru/sites/default/files2019/articles/2021-02/Java.jpg'},
    ])
    const [sortType, setSortType] = useState('price-high');

    useEffect(() => {
        const sortByPrice = (type: any) => {
            switch (sortType) {
                case 'price-high':
                    setState([...state].sort((a, b) => a.price < b.price ? -1 : 1))
                    break;
                case 'price-low':
                    setState([...state].sort((a, b) => a.price > b.price ? -1 : 1))
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
        console.log(state);

    }, [sortType])
    console.log(state)
    return (
        <div className={'App'}>
            <Router>
                <div className={'imgPlace'}>
                    <img src="https://media.foxford.ru/wp-content/uploads/2020/02/%D0%B8%D1%82%D0%B2%D1%83%D0%B7.jpg"
                         alt=""/>
                    <h1>
                        IT-Courses
                    </h1>
                    <nav>
                        <Link to="/home">Home</Link>
                    </nav>
                </div>
                <div>
                    <Switch>
                        <Route path="/home">
                            <Home
                                setSortType={setSortType}
                                courses={state}
                            />
                        </Route>
                        <Route path="/course/:courseId">
                            <Course courses={state}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;

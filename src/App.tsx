import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Course from "./Course";
import Home from "./Home";

export type coursesStateType = {
  id:number;
  name:string;
  description:string;
  price:number;
  dateOfBeginning:string;
}

const initialState:coursesStateType[] = [
  {id:1, name:'JS', description:'React', price:100, dateOfBeginning: '10-10-2021'},
  {id:2, name:'Python', description:'MachineLearning', price:50, dateOfBeginning: '11-10-2021'},
  {id:3, name:'HTML', description:'Tags', price:80, dateOfBeginning: '12-10-2021'},
  {id:4, name:'CSS', description:'Styles', price:105, dateOfBeginning: '13-10-2021'},
  {id:5, name:'TS', description:'Types', price:101, dateOfBeginning: '14-10-2021'},
  {id:6, name:'Java', description:'LearnJava', price:1000, dateOfBeginning: '15-10-2021'},
]

function App() {

  const [state, setState] = useState<coursesStateType[]>(initialState)

  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/home">
              <Home courses={state}/>
            </Route>
            <Route path="/course/:courseId">
              <Course courses={state}/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;

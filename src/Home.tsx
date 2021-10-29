import {coursesStateType} from "./App";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Pagination from "./Pagination";

type coursesType = {
    courses: coursesStateType[];
    setSortType: (e: string) => void;
    editCourse:(id:number)=>void;
}
const Home = ({courses, setSortType,editCourse}: coursesType) => {
    return (
        <div>
            <div className={'sort'}>
                Sort by: <select onChange={(e) => setSortType(e.target.value)}>
                <option value={'price-high'}>Price(high-low)</option>
                <option value={'price-low'}>Price(low-high)</option>
                <option value={'date'}>Newest</option>
            </select>
            </div>
            <Pagination
                editCourse={editCourse}
                courses={courses}
            />
        </div>
    )
}
export default Home;
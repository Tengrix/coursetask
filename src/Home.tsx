import {coursesStateType} from "./App";
import Course from "./Course";
import {Link, Route} from "react-router-dom";
import {useState} from "react";

type coursesType = {
    courses: coursesStateType[]
}

const Home = ({courses}: coursesType) => {
    const [portionNumber,setPortionNumber] = useState<number>(1)
    const portionSize = 2;
    let pagesCount = Math.ceil(courses.length / portionSize)
    console.log(pagesCount)

    const pages = []
    for(let i =0; i <= pagesCount; i++){
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize+1
    const rightPortionPageNumber = portionNumber * portionSize
    return (
        <div>
            {courses.filter((el,i)=> i >= leftPortionPageNumber && i <= rightPortionPageNumber).map(el =>
                <div key={el.id} className={'course'}>
                    <Link  to={`/course/${el.id}`}>
                        <div>{el.name}</div>
                    </Link>
                    <div>{el.description}</div>
                    <div>{el.price}</div>
                    <div>{el.dateOfBeginning}</div>
                </div>
            )}
            {portionNumber > 1 && <button onClick={()=>{setPortionNumber(portionNumber-1)}}>prev</button>}
            {pages.filter(el=> el >= leftPortionPageNumber && el <= rightPortionPageNumber)
                .map(el=> <button key={el} onClick={()=>setPortionNumber(el)}>{el}</button>)}
            {portionCount >= portionNumber && <button disabled={portionNumber > portionCount} onClick={()=>{setPortionNumber(portionNumber+1)}}>next</button>}

        </div>
    )
}
export default Home;
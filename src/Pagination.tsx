import {useState} from "react";
import {Link} from "react-router-dom";
import {coursesStateType} from "./App";
type paginationType = {
    courses:coursesStateType[]
}
const Pagination = ({courses}:paginationType) =>{
    const [portionNumber,setPortionNumber] = useState<number>(1)
    const portionSize = 2;
    let pagesCount = Math.ceil(courses.length / portionSize)
    const pages = []
    for(let i = 1; i <= pagesCount; i++){
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize+1
    const rightPortionPageNumber = portionNumber * portionSize
    return (
        <div>
            {courses.filter((el,i)=> i >= leftPortionPageNumber-1 && i <= rightPortionPageNumber-1).map(el =>
                <div key={el.id} className={'course'}>
                    <img src={`${el.picOfCourse}`} alt=""/>
                    <b>Name of course:</b>
                    <Link  to={`/course/${el.id}`}>
                        {el.name}
                    </Link>
                    <div><b>Course description:</b> {el.description}</div>
                    <div><b>Course price:</b> {el.price}$</div>
                    <div><b>Date of beginning:</b> {el.dateOfBeginning}</div>
                </div>
            )}
            {portionNumber > 1 && <button onClick={()=>{setPortionNumber(portionNumber-1)}}>prev</button>}
            {pages.map(el=> <button className={el===portionNumber? 'pages':''} key={el} onClick={()=>setPortionNumber(el)}>{el}</button>)}
            {portionCount >= portionNumber && <button onClick={()=>{setPortionNumber(portionNumber+1)}}>next</button>}

        </div>
    )
}
export default Pagination
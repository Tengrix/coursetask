import React from 'react';
import {courseType} from "../../redux/App-reducer";
type PaginationType = {
    portionNumber:number;
    setPortionNumber:(value:number)=>void;
    courses:courseType[];
    portionSize:number;
}
const MainPagePagination = ({portionNumber,setPortionNumber,courses,portionSize}:PaginationType) => {
    let pagesCount = Math.ceil(courses.length / portionSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    return (
        <div className={'pagination'}>

            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>prev</button>}
            {pages.map(el => <button className={el === portionNumber ? 'pages' : ''} key={el}
                                     onClick={() => setPortionNumber(el)}>{el}</button>)}
            {portionCount >= portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>next</button>}
        </div>
    );
};

export default MainPagePagination;
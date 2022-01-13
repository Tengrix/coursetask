import {useState} from "react";
import {Link} from "react-router-dom";
import {courseType} from "./redux/App-reducer";

type paginationType = {
    courses: courseType[];
    delCourse: (id: number) => void;
}
const Pagination = ({courses, delCourse}: paginationType) => {
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const portionSize = 2;
    let pagesCount = Math.ceil(courses.length / portionSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className="container">
            <div className="row">
                {courses.filter((el, i) => i >= leftPortionPageNumber - 1 && i <= rightPortionPageNumber - 1).map(el =>
                    <div className="col" key={el.id}>
                        <div className={'course'}>
                            <Link to={`/course/${el.id}`}>
                                <img src={`${el.picOfCourse}`} alt=""/>
                            </Link>
                        </div>
                        <div className="col">
                            <b>Name of course:</b>
                            {el.name}
                            <div><b>Course description:</b> {el.description}</div>
                            <div><b>Course price:</b> {el.price}$</div>
                            <div><b>Date of beginning:</b> {el.dateOfBeginning}</div>
                            <div>
                                <button onClick={() => delCourse(el.id)}>del</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
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

        </div>
    )
}
export default Pagination
import {useState} from "react";
import {Link} from "react-router-dom";
import MainPagePagination from "../../../common/Pagination/MainPagePagination";
import {courseType} from "../../../types/Types";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/redux";

type paginationType = {
    courses: courseType[];
    delCourse: (id: number) => void;
}
const ListOfCourses = ({courses, delCourse}: paginationType) => {
    const filteredCourses = useSelector<AppRootStateType, courseType[]>(state =>{
        const all = state.CoursePage.course
        const filterId = state.CoursePage.searchTitle;
        if ( filterId === '' ) {
            return all;
        }
        else {
            return all.filter( project => project.name.toLowerCase().includes(filterId) );
        }
    } )
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const portionSize = 2;
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className="container">
            <div className="row">
                {filteredCourses.filter((el, i) => i >= leftPortionPageNumber - 1 && i <= rightPortionPageNumber - 1)
                    .map(el =>
                        <div className="col" key={el.id}>
                            <div className={'course'}>
                                <Link to={`/course/${el.id}`}>
                                    <img src={`${el.picOfCourse}`} alt=""/>
                                </Link>
                            </div>
                            <div className="col">
                                <b>Name of course:</b>
                                {el.name}
                                <div>
                                    <b>Course description:</b>
                                    {el.description}
                                </div>
                                <div>
                                    <b>Course price:</b>
                                    {el.price}$
                                </div>
                                <div>
                                    <b>Date of beginning:</b>
                                    {el.dateOfBeginning}
                                </div>
                                <div>
                                    <button onClick={() => delCourse(el.id)}>del</button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
            <MainPagePagination
                portionNumber={portionNumber}
                courses={courses}
                portionSize={portionSize}
                setPortionNumber={setPortionNumber}
            />
        </div>
    )
}
export default ListOfCourses
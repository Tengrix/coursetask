import ListOfCourses from "./ListOfCourses/ListOfCourses";
import {courseType, setSort, sortType} from "../../redux/App-reducer";
import {useDispatch} from "react-redux";

type coursesType = {
    courses: courseType[];
    sortTypes: sortType
    delCourse: (id: number) => void;
}
const MainPage = ({courses, delCourse}: coursesType) => {
    const dispatch = useDispatch()
    const getSorting = (type: sortType) => {
        dispatch(setSort({types: type}))
    }
    return (
        <div>
            <div className={'sort'}>
                Sort by: <select onChange={(e) => getSorting(e.currentTarget.value as sortType)}>
                <option value={'price-high'}>Price(high-low)</option>
                <option value={'price-low'}>Price(low-high)</option>
                <option value={'date'}>Newest</option>
            </select>
            </div>
            <ListOfCourses
                delCourse={delCourse}
                courses={courses}
            />
        </div>
    )
}
export default MainPage;
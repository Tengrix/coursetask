import Pagination from "./Pagination";
import {courseType, setSort, sortType} from "./redux/App-reducer";
import {useDispatch} from "react-redux";

type coursesType = {
    courses: courseType[];
    sortTypes: sortType
    delCourse: (id: number) => void;
}
const Home = ({courses, delCourse}: coursesType) => {
    const dispatch = useDispatch()
    const getSorting = (type: sortType) => {
        debugger
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
            <Pagination
                delCourse={delCourse}
                courses={courses}
            />
        </div>
    )
}
export default Home;
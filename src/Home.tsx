import Pagination from "./Pagination";
import {appActions, courseType, sortType} from "./redux/App-reducer";
import {useDispatch} from "react-redux";

type coursesType = {
    courses: courseType[];
    sortTypes: sortType
    editCourse:(id:number)=>void;
}
const Home = ({courses, sortTypes,editCourse}: coursesType) => {
    const dispatch = useDispatch()
    const getSorting = (type:sortType) =>{
        debugger
        dispatch(appActions.setSort(type))
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
                editCourse={editCourse}
                courses={courses}
            />
        </div>
    )
}
export default Home;
import ListOfCourses from "./ListOfCourses/ListOfCourses";
import {useDispatch} from "react-redux";
import {courseType, sortType} from "../../types/Types";
import {setSort} from "../../redux/Course-reducer";
import SearchCourse from "../Search/SearchCourse";
import s from "./../../App.css";

type coursesType = {
    courses: courseType[];
    sortTypes: sortType;
    delCourse: (id: number) => void;
    searchCourse: (course: string) => void;
}
const MainPage = ({courses, delCourse, searchCourse}: coursesType) => {
    const dispatch = useDispatch()
    const getSorting = (type: sortType) => {
        dispatch(setSort({types: type}))
    }
    return (
        <div>
            <div>
                <SearchCourse
                    searchCourse={searchCourse}
                />
                <div>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example"
                            onChange={(e) => getSorting(e.currentTarget.value as sortType)}>
                        <option value={'price-high'}>Price(high-low)</option>
                        <option value={'price-low'}>Price(low-high)</option>
                        <option value={'date'}>Newest</option>
                    </select>
                </div>
            </div>
            <ListOfCourses
                delCourse={delCourse}
                courses={courses}
            />
        </div>
    )
}
export default MainPage;
import {useParams} from "react-router-dom";
import Course from './Single Course/Course'
import {courseType} from "../../types/Types";

type coursesType = {
    courses: courseType[];
    changeOldCourse: (course: courseType, id: number) => void;
}

const Courses = ({courses, changeOldCourse}: coursesType) => {
    const {courseId} = useParams<{ courseId: string }>()
    return (
        <div className={'course'}>
            {courses.map(el =>
                <div key={el.id}>
                    {el.id === +courseId &&
                    <Course
                        course={el}
                        changeOldCourse={changeOldCourse}
                    />
                    }
                </div>)}
        </div>
    )
}
export default Courses;
import {coursesStateType} from "./App";
import {useParams} from "react-router-dom";

type coursesType = {
    courses: coursesStateType[]
}

const Course = ({courses}:coursesType) =>{
    const {courseId} = useParams<{courseId:string}>()
    return(
        <div className={'course'}>
            {courses.map(el=><div key={el.id}>
                {el.id===+courseId?
                    <div>
                        <div> <b>Description:</b> {el.description}</div>
                        <div> <b>Price:</b> {el.price}</div>
                        <div> <b>Beginning Date:</b> {el.dateOfBeginning}</div>
                    </div>:''}
            </div>)}
        </div>
    )
}
export default Course;
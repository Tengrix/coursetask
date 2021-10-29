import {coursesStateType} from "./App";
import {useParams} from "react-router-dom";
import {useState} from "react";

type courseType = {
    course: coursesStateType;
    changePrice: (value: number, id: number) => void;
    changeDescription: (description: string, id: number) => void;
    changeDate: (date: string, id: number) => void;
}

const Course = ({course, changePrice, changeDescription, changeDate}: courseType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [newPrice, setNewPrice] = useState<number>(course.price)
    const [newDes, setNewDes] = useState<string>(course.description)
    const [newDate, setNewDate] = useState<string>(course.dateOfBeginning)
    const saveHandler = () => {
        changePrice(newPrice, course.id)
        changeDescription(newDes, course.id)
        changeDate(newDate, course.id)
        setEdit(false)
    }
    return (
        <div className={'course'}>
            <div>
                <div><b>Description:</b> {edit ? <div> <textarea value={newDes}
                                                                 onChange={event => setNewDes(event.currentTarget.value)}/>
                    </div> : course.description}
                </div>
                <div><b>Price:</b> {edit ? <input type="number" value={newPrice}
                                                  onChange={event => setNewPrice(+event.currentTarget.value)}/> : newPrice}$
                </div>
                <div><b>Beginning Date:</b> {edit ? <input type="text" value={newDate}
                                                           onChange={event => setNewDate(event.currentTarget.value)}/> : newDate}
                </div>
            </div>
            <button onClick={() => setEdit(!edit)}>edit</button>
            <button onClick={saveHandler}>save</button>
        </div>
    )
}
export default Course;
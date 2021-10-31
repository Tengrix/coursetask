import {useForm} from "react-hook-form";
import s from './CourseForm.module.css'

type CourseFormType = {
    uploadPic: (pic:string, title: string, pageNumber: number, per_page: number) => void;
    title: string;
    currentPage: number;
    per_page: number;
    setTitle: (title: string) => void;
    pic?: File;
    addCourse: (name: string, price: number, date: string, description: string, pic: string) => void
}
type ReactHookFormType = {
    name: string;
    price: number;
    date: string;
    description: string;
    pic: string;
}
const CourseForm = ({uploadPic, title, currentPage, per_page, setTitle, pic, addCourse}: CourseFormType) => {
    const {register, handleSubmit,formState: { errors }} = useForm<ReactHookFormType>()
    const onSubmit = (data: ReactHookFormType) => {
        debugger
        addCourse(data.name,data.price,data.date,data.description,`${pic}`)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Course name</span>
                <input {...register('name',{ required: true, maxLength: 20 })} type="text"
                       className="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
        <span className={s.errors}>{errors.name?.type === 'required' && "Name is required"}</span>
            <div className="input-group mb-3">
                <span className="input-group-text">Course price</span>
                <input {...register('price',{ required: true})} type="number"
                       className="form-control"
                       aria-label="Dollar amount (with dot and two decimal places)"/>
                <span className="input-group-text">$</span>
            </div>
            <span className={s.errors}>{errors.price?.type === 'required' && "Price is required"}</span>

            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Course date</span>
                <input {...register('date',{ required: true})} type="text"
                       className="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
        <span className={s.errors}>{errors.date?.type === 'required' && "Date is required"}</span>
            <div>
                <span className="input-group-text">Course description</span>
            </div>
            <div className="input-group">
                <textarea {...register('description',{ required: true })} className="form-control" aria-label="With textarea"/>
            </div>
        <span className={s.errors}>{errors.description?.type === 'required' && "Description is required"}</span>
            <div>
                Search image
            </div>
            <div className="input-group mb-3">
                <input onChange={(event => setTitle(event.currentTarget.value))} type="text" className="form-control"
                       placeholder="Course image"
                       aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <button disabled={title === ''} onClick={() => uploadPic(`${pic}`,title, currentPage, per_page)}
                        className="btn btn-outline-secondary" type="button" id="button-addon2">Get Images
                </button>
            </div>
            <input type="submit"/>
        </form>
    )
}
export default CourseForm;
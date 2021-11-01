import {useForm} from "react-hook-form";
import s from './CourseForm.module.css'
import {DataType} from "./NewCourse";
import SearchImg from "./SearchImg";
import {useEffect} from "react";
import queryString from "querystring";
import {useHistory} from "react-router-dom";

type CourseFormType = {
    uploadPic: (pic: string, title: string, pageNumber: number, per_page: number) => void;
    title: string;
    currentPage: number;
    per_page: number;
    setTitle: (title: string) => void;
    pic?: File;
    addCourse: (name: string, price: number, date: string, description: string, pic: string) => void
    getPic: (id: string) => void;
    listOfImg: DataType[];
}
type ReactHookFormType = {
    name: string;
    price: number;
    date: string;
    description: string;
    pic: string;
}
const CourseForm = ({uploadPic,title,currentPage,per_page,setTitle,pic,addCourse,getPic,listOfImg}: CourseFormType) => {
    const {register, handleSubmit, formState: {errors}} = useForm<ReactHookFormType>()
    const history = useHistory()
    const onSubmit = (data: ReactHookFormType) => {
        addCourse(data.name, data.price, data.date, data.description, `${pic}`)
    }
    useEffect(()=>{
        debugger
        const parsed = queryString.parse(history.location.search.substr(1))
        let pages = currentPage
        if(parsed.pages) pages = Number(parsed.pages)
        console.log(pages)
        uploadPic(`${pic}`,title,pages,per_page)
    },[currentPage,title])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Course name</span>
                <input {...register('name', {required: true, maxLength: 20})} type="text"
                       className="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <span className={s.errors}>{errors.name?.type === 'required' && "Name is required"}</span>
            <div className="input-group mb-3">
                <span className="input-group-text">Course price</span>
                <input {...register('price', {required: true})} type="number"
                       className="form-control"
                       aria-label="Dollar amount (with dot and two decimal places)"/>
                <span className="input-group-text">$</span>
            </div>
            <span className={s.errors}>{errors.price?.type === 'required' && "Price is required"}</span>

            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Course date</span>
                <input {...register('date', {required: true})} type="text"
                       className="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <span className={s.errors}>{errors.date?.type === 'required' && "Date is required"}</span>
            <div>
                <span className="input-group-text">Course description</span>
            </div>
            <div className="input-group">
                <textarea {...register('description', {required: true})} className="form-control"
                          aria-label="With textarea"/>
            </div>
            <span className={s.errors}>{errors.description?.type === 'required' && "Description is required"}</span>
            <div>
                Search image
            </div>
            <div className="input-group mb-3">
                <input onChange={(event => setTitle(event.currentTarget.value))} type="text" className="form-control"
                       placeholder="Course image"
                       aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <button disabled={title === ''} onClick={() => uploadPic(`${pic}`, title, currentPage, per_page)}
                        className="btn btn-outline-secondary" type="button" id="button-addon2">Get Images
                </button>
            </div>
            <div>
                Chose the course image below:
            </div>
            {listOfImg.map((el: DataType) => <span key={el.id}>
                    <SearchImg
                        getPic={getPic}
                        images={el}
                        currentPage={currentPage}
                        title={title}
                    />
                </span>
            )}
            <div>
                <input type="submit"/>
            </div>
        </form>
    )
}
export default CourseForm;
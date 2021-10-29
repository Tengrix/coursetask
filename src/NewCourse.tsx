import {useState} from "react";
import axios from "axios";
import SearchImg from "./SearchImg";
import ImgPagination from "./ImgPagination";
export type DataType = {
    "id": string,
    "created_at": string,
    "updated_at": string,
    "promoted_at": string,
    "width": number,
    "height": number,
    "color": string,
    "blur_hash": string,
    "description": string,
    "alt_description": string,
    "urls": {
        "raw": string,
        "full": string,
        "regular": string,
        "small": string,
        "thumb": string
    }
}
type NewCourseType = {
    addCourse: (name: string, price: number, date: string, description: string, pic: string) => void
    uploadPic:(img: string, title: string, pageNumber: number, per_page:number)=>void;
    find:boolean;
    totalCountOfImg:number;
    listOfImg : DataType[];
    getPic:(id:string) => void;
}


const NewCourse = ({addCourse,uploadPic,find,totalCountOfImg,listOfImg,getPic}: NewCourseType) => {
    const [title, setTitle] = useState<string>('')
    const [course, setCourse] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [des, setDes] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pic, setPic] = useState<File>()
    const per_page = 6


    const onPageChanged = (img: string, title: string, pageNumber: number, per_page:number) =>{
        setCurrentPage(pageNumber)
        uploadPic(img,title,pageNumber,per_page)
    }
    return (
        <div className={'newCourse'}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Course name</span>
                <input defaultValue={course} onChange={(event => setCourse(event.currentTarget.value))} type="text" className="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Course price</span>
                <input defaultValue={price} onChange={(event => setPrice(+event.currentTarget.value))} type="text" className="form-control"
                       aria-label="Dollar amount (with dot and two decimal places)"/>
                <span className="input-group-text">$</span>
                <span className="input-group-text">0.00</span>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Course date</span>
                <input defaultValue={date} onChange={(event => setDate(event.currentTarget.value))} type="text" className="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div>
                <span className="input-group-text">Course description</span>
            </div>
            <div className="input-group">
                <textarea className="form-control" aria-label="With textarea" defaultValue={des} onChange={(event => setDes(event.currentTarget.value))}/>
            </div>

            <div>
                Search image
            </div>
            <div className="input-group mb-3">
                <input onChange={(event => setTitle(event.currentTarget.value))} type="text" className="form-control" placeholder="Course image"
                       aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <button disabled={title === ''} onClick={() => uploadPic(`${pic}`, title, currentPage,per_page )} className="btn btn-outline-secondary" type="button" id="button-addon2">Get Images</button>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => addCourse(course, price, date, des, `${pic}`)}>add</button>
            <div>
                Chose the course image below:
            </div>
            {find?
                <ImgPagination
                    currentPage={currentPage}
                    pageCount={per_page}
                    onPageChanged={onPageChanged}
                    totalCountOfImg={totalCountOfImg}
                    portionSize={5}
                    title={title}
                    pic={pic}
                />:''
            }
            {listOfImg.map((el: DataType) => <span key={el.id}>
                    <SearchImg
                        getPic={getPic}
                        images={el}
                    />
                </span>
            )}
        </div>
    )
}
export default NewCourse;
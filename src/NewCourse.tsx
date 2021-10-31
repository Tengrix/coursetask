import {useState} from "react";
import SearchImg from "./SearchImg";
import ImgPagination from "./ImgPagination";
import CourseForm from "./CourseForm";

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
    uploadPic: (pic:string, title: string, pageNumber: number, per_page: number) => void;
    find: boolean;
    totalCountOfImg: number;
    listOfImg: DataType[];
    getPic: (id: string) => void;
    pic?: File
}


const NewCourse = ({addCourse, uploadPic, find, totalCountOfImg, listOfImg, getPic, pic}: NewCourseType) => {
    const [title, setTitle] = useState<string>('')

    const [currentPage, setCurrentPage] = useState<number>(1)
    const per_page = 6

    const onPageChanged = (img: string, title: string, pageNumber: number, per_page: number) => {
        setCurrentPage(pageNumber)
        uploadPic(img,title, pageNumber, per_page)
    }
    return (
        <div className={'newCourse'}>
           <CourseForm
               title={title}
               setTitle={setTitle}
               currentPage={currentPage}
               uploadPic={uploadPic}
               per_page={per_page}
               pic={pic}
               addCourse={addCourse}
           />

            <div>
                Chose the course image below:
            </div>
            {listOfImg.map((el: DataType) => <span key={el.id}>
                    <SearchImg
                        getPic={getPic}
                        images={el}
                    />
                </span>
            )}
            {find ?
                <ImgPagination
                    currentPage={currentPage}
                    pageCount={per_page}
                    onPageChanged={onPageChanged}
                    totalCountOfImg={totalCountOfImg}
                    portionSize={5}
                    title={title}
                    pic={pic}
                /> : ''
            }
        </div>
    )
}
export default NewCourse;
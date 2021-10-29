import {DataType} from "./NewCourse";
import s from './SearchImg.module.css'
type ImgType = {
    images:DataType;
    getPic:(id:string)=>void;
}
const SearchImg =  ({images,getPic}:ImgType) => {
    return(

        <span >
            <img className={s.newCourseImg} onClick={()=>getPic(images.id)} src={images.urls.small} alt=""/>

        </span>
    )
}
export default SearchImg;
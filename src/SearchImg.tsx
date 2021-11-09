import s from './SearchImg.module.css'
import {useHistory} from "react-router-dom";
import {DataType} from "./api/api";

type ImgType = {
    images:DataType;
    getPic:(id:string)=>void;
    currentPage:number;
    title:string;
}
const SearchImg =  ({images,getPic,}:ImgType) => {
    const getPictures = () =>{
        getPic(images.id)
    }


    return(
        <span >
            <img className={s.newCourseImg} onClick={getPictures} src={images.urls.small} alt=""/>
        </span>
    )
}
export default SearchImg;
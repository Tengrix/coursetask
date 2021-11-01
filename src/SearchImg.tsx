import {DataType} from "./NewCourse";
import s from './SearchImg.module.css'
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";
type ImgType = {
    images:DataType;
    getPic:(id:string)=>void;
    currentPage:number;
    title:string;
}
const SearchImg =  ({images,getPic,currentPage,title}:ImgType) => {
    const history = useHistory()
    const getPictures = () =>{
        getPic(images.id)
        history.push({
            pathname:'/new-course'
        })
    }
    useEffect(() => {
        history.push({
            pathname: '/new-course',
            search: `?title=${title}&pages=${currentPage}`
        })
        return()=>{}
    }, [currentPage])
    return(
        <span >
            <img className={s.newCourseImg} onClick={getPictures} src={images.urls.small} alt=""/>

        </span>
    )
}
export default SearchImg;
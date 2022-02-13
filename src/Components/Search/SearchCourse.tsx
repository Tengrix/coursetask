import React, {ChangeEvent, useState} from 'react';
import s from './mainPageSearch.module.css'
type searchCourseType = {
    searchCourse: (title:string)=>void;
}

const SearchCourse = ({searchCourse}:searchCourseType) => {
    const [title,setTitle] = useState<string>('')
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            <div className={s.mainBlock}>
                <div className="input-group mb-3">
                    <input onChange={onChangeHandler} type="text" className="form-control" placeholder="Course name"
                           aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <button type="button" className="btn btn-primary" onClick={()=>searchCourse(title)}>Search</button>

                </div>
            </div>
        </div>
    );
};

export default SearchCourse;
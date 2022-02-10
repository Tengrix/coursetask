import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={'imgPlace'}>
            <img className="img-fluid"
                 src="https://media.foxford.ru/wp-content/uploads/2020/02/%D0%B8%D1%82%D0%B2%D1%83%D0%B7.jpg"
                 alt=""/>
            <h1 className="display-4">
                IT-Courses
            </h1>
            <span>
                    <nav>
                        <Link to="/new-course" className={'mainMenu'}>New Course</Link>
                    </nav>
                        </span>
        </div>
    );
};

export default Header;
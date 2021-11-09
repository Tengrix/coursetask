import {useState} from "react";
import s from "./Paginator.module.css";

type ImgPaginationType = {
    pageCount: number;
    currentPage: number;
    portionSize: number
    onPageChanged: (title: string, pageNumber: number, per_page: number) => void;
    title: string;
    pic?: string;
    totalCountOfImg: number;
}
const ImgPagination = ({
                           pageCount,
                           currentPage,
                           portionSize,
                           onPageChanged,
                           pic,
                           title,
                           totalCountOfImg
                       }: ImgPaginationType) => {
    let pagesCount = Math.ceil(totalCountOfImg / pageCount)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={s.paginator}>
            <div>
                {portionNumber > 1 &&
                <button className={s.btn} onClick={() => setPortionNumber(portionNumber - 1)}> PREV</button>}
                {pages.filter(el => el >= leftPortionPageNumber && el <= rightPortionPageNumber)
                    .map((el) => {
                        return <span key={el}>
                        <button onClick={() => onPageChanged(title, el, pageCount)}
                                className={currentPage === el ? s.selectedPage : ''}>{el}</button>
                    </span>
                    })}
                {portionCount > portionNumber &&
                <button className={s.btn} onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
            </div>
        </div>
    )
}
export default ImgPagination;
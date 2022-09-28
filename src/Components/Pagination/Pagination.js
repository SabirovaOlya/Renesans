import React, { useRef, useState } from 'react';
import './Pagination.css';

function Pagination({ itemsPerPage, totalItems, paginate }) {
    
    
    let ulParent = useRef(null);
    let numbers = document.querySelectorAll('.pagination_item')
    const [activeItem, setActiveItem] = useState(0);

    const pageNumber = [];
    for(let i=1; i<=Math.ceil(totalItems/itemsPerPage);i++){
        pageNumber.push(i)
    }

    return(

        <ul className='pagination' ref={ulParent}>
            {
                pageNumber?.map((item,index)=>(
                    <li className={ index== activeItem? 'pagination_item active' : 'pagination_item'} key={item} onClick={()=>{
                        paginate(item)
                        setActiveItem(index)
                    }}>{item}</li>
                ))
            }
        </ul>
    )
}

export default Pagination
import React, { useState } from 'react'

function NewPagination({ paginations, getEmployees, statee }) {
    const [ state, setState ] = useState(statee)
    return(
        <button onClick={() => console.log(setState(!state))}>Click</button>
    )
    // // Arrow putting Function
    // function arrowFunc (label) {
    //     if(label.split('')[0] === 'N'){
    //         return '>'
    //     }else if (label.split('')[0] === '&'){
    //         return '<'
    //     }else{
    //         return label
    //     }
    // }

    // paginations?.map((pagination, paginationId) => {
    //     return (
    //         <button className={pagination.active? 'pagiantion_active' : ''} onClick={() => {getEmployees(pagination?.url.split('/')[4])}}>{arrowFunc(pagination.label)}</button>
    //     )
    // })
}

export default NewPagination
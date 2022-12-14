import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Styles
import './Filial.css'
// Components
import { Input, Modal, Button, Text, Row } from '@nextui-org/react'
import Pagination from '../../Components/Pagination/Pagination'
// API
import https from '../../assets/https'
import { Loading } from "@nextui-org/react";

function Filial({ data }) {

    const [filiallar, setFiliallar] = useState([])
    const [loading, setLoading] = useState(true);
    let role = JSON.parse(window.localStorage.getItem('role'))


    // PAGINATION
    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('branches')


    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                setPaginations(res.data.meta.links)
                setFiliallar(res.data.data)
                setTimeout(()=>{
                    setLoading(false)
                },150)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    // Arrow putting Function
    function arrowFunc(label) {
        if (label === 'Next &raquo;') {
            return '>'
        } else if (label === '&laquo; Previous') {
            return '<'
        } else {
            return label
        }
    }

    useEffect(() => {
        getUrl(currentUrl)
    }, []);

    // Delete Branch Func
    function deleteBranch(branchIndex) {
        https
            .delete(`/branches/${branchIndex}`)
            .then(res => {
                setFiliallar(filiallar.filter((filial, filialIndex) => filial.id !== branchIndex))
            })
            .catch(err => console.log(err))
    }

    return (
        <section className='filial'>
            <h1 className='filial_title'>Filiallar</h1>
            <div className='filial_header'>
                <Link to='/filials/addfilial'>
                    Filial Qoshish
                    <i className='bx bx-plus-circle'></i>
                </Link>
                <Input
                    rounded
                    bordered
                    placeholder="Filial nomi..."
                    color="secondary"
                    label=' '
                    width='300px'
                    className='filial_search'
                    contentRight={
                        <i className='bx bx-search-alt-2'></i>
                    }
                />
            </div>
            <div className='filial_table_block'>
                <ul className='filial_table'>
                    <li className='filial_table_header'>
                        <p>Qisqa nomi</p>
                        <p>Manzil</p>
                        <p>Shahar</p>
                    </li>
                    {
                        loading ? 
                        <div className='loader_container'>
                            <Loading size="sm" type="spinner"/>
                        </div>
                    :
                        (
                            <>
                                {
                                    filiallar?.map((item, index) => {
                                        return <li key={index} className='filial_table_products client_row'>
                                            <p className='filial_table_product'>{item?.short_name}</p>
                                            <p className='filial_table_product'>{item?.address}</p>
                                            <p className='filial_table_product'>{item?.city}</p>
                                            <div className='filial_table_product'>
                                                <button><Link to={`/filials/singlefilial/${item?.id}`}><i className='bx bx-user white'></i></Link></button>
                                                { role.includes('admin') ? (
                                                    <>
                                                        <button><Link to={`/filials/editfilial/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
                                                        <button onClick={() => deleteBranch(item?.id)}><i className='bx bx-trash'></i></button>
                                                    </>
                                                ) : <></>}
                                            </div>
                                        </li>
                                    })
                                }
                            </>)
                    }
                </ul>
            </div>
            <div className='pagination_block_wrapper'>
                <div className='pagination_block'>
                    {
                        paginations?.map((pagination, paginationId) => {
                            return (
                                <button key={paginationId} className={pagination.active ? 'pagiantion_active' : ''} onClick={() => { getUrl(pagination?.url.split('/')[4]) }}>{arrowFunc(pagination.label)}</button>
                            )
                        })
                    }
                </div>
            </div>
        </section >
    )
}

export default Filial
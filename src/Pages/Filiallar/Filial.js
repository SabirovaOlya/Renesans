import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Styles
import './Filial.css'
// Components
import { Input, Modal, Button, Text, Row } from '@nextui-org/react'
import Pagination from '../../Components/Pagination/Pagination'
// API
import https from '../../assets/https'
import { PulseLoader } from 'react-spinners'

function Filial({ data }) {

    const [filiallar, setFiliallar] = useState([])
    const [loading, setLoading] = useState(true);


    // PAGINATION
    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('branches')


    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                setPaginations(res.data.meta.links)
                setFiliallar(res.data.data)
                setLoading(false)
            })
    }

    // Arrow putting Function
    function arrowFunc(label) {
        if (label.split('')[0] === 'N') {
            return '>'
        } else if (label.split('')[0] === '&') {
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
    function returnData() {
        if (loading) {
            return (<PulseLoader size={50} color={'#7828c8'} />)
        } else {
            return (
                <>
                    <ul className='filial_table'>
                        <li className='filial_table_header'>
                            <p>Qisqa nomi</p>
                            <p>Mansil</p>
                            <p>Shahar</p>
                        </li>
                        {
                            filiallar?.map((item, index) => {
                                return <li key={index} className='filial_table_products client_row'>
                                    <p className='filial_table_product'>{item?.short_name}</p>
                                    <p className='filial_table_product'>{item?.address}</p>
                                    <p className='filial_table_product'>{item?.city}</p>
                                    <div className='filial_table_product'>
                                        <button><Link to={`/filials/singlefilial/${item?.id}`}><i className='bx bx-user white'></i></Link></button>
                                        <button><Link to={`/filials/editfilial/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
                                        <button onClick={() => deleteBranch(item?.id)}><i className='bx bx-trash'></i></button>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </>
            )
        }
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
            <div className='filial_table_block'>{returnData()}</div>
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
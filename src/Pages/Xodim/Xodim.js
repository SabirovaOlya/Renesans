import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../Context.js'

// Components
import { Input } from '@nextui-org/react'
import Pagination from '../../Components/Pagination/Pagination'
import { PulseLoader } from 'react-spinners'
import EditXodim from './EditXodim'

// Styles
import './Xodim.css'
import '../../assets/spinner.css'
import '../../assets/pagination.css'
// API
import https from '../../assets/https'
import { Loading } from "@nextui-org/react";

// Styles
import '../../assets/spinner.css'
import './Xodim.css'


function Xodim() {
    const [xodimlar, setXodimlar] = useState([])
    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('employees')
    const [loading, setLoading] = useState(true)
    let role = JSON.parse(window.localStorage.getItem('role'))

    function getUrl(newUrl) {
        https
        .get(`/${newUrl}`)
        .then(res => {
            setPaginations(res.data.meta.links)
            setXodimlar(res.data.data)
            setLoading(false)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    useEffect(() => {

        getUrl(currentUrl)

    }, []);

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
    // Delete Function
    function deleteXodim(xodimIndex) {
        https
            .delete(`/employees/${xodimIndex}`)
            .then(res => {
                setXodimlar(xodimlar.filter((xodim, xodimId) => xodim.id !== xodimIndex))
            })
            .catch(err => console.log(err))
    }


    return (
        <section className='xodim'>
            <h1 className='filial_title'>Xodimlar</h1>
            <div className='filial_header'>
                <Link to='/xodim/addxodim'>
                    Xodim Qoshish
                    <i className='bx bx-plus-circle'></i>
                </Link>
                <Input
                    rounded
                    bordered
                    placeholder="Xodim nomi..."
                    label=' '
                    color="secondary"
                    width='300px'
                    className='filial_search'
                    contentRight={
                        <i className='bx bx-search-alt-2'></i>
                    }
                />
            </div>
            <div className='xodim_table_block'>
                <ul className='xodim_table'>
                    <li className='xodim_table_header'>
                        <p>Fillial</p>
                        <p>Bo'lim</p>
                        <p>Ismi</p>
                        <p>Kodi</p>
                        <p></p>
                    </li>
                    {
                        loading ? 
                        <div className='loader_container'>
                            <Loading size="lg" type="spinner"/>
                        </div> : 
                        (<>
                            {
                                xodimlar?.map((item, index) => {
                                    return <li key={index} className='xodim_table_product client_row' >
                                        <div className=''>{item?.branch?.name}</div>
                                        <div className=''>{item?.section?.name}</div>
                                        <div className=''>{item.name}</div>
                                        <div className=''>{item.code}</div>
                                        <div className=''>
                                            <button><Link to={`/xodim/singlexodim/${item?.id}`}><i className='bx bx-user white'></i></Link></button>
                                            { role.includes('admin') ? (
                                                <>
                                                    <button><Link to={`/xodim/editxodim/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
                                                    <button onClick={() => deleteXodim(item.id)}><i className='bx bx-trash'></i></button>
                                                </>
                                            ) : <></>}
                                        </div>
                                    </li>
                                })
                            }
                        </>)
                    }
                </ul>
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
            </div>
        </section>
    )
}

export default Xodim